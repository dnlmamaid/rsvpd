import {Component, input, signal, computed, effect, inject, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RsvpService } from '../../../../core/services/rsvp.service';
import {Invite} from "../../rsvp.types";

@Component({
  selector: 'app-rsvp-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rsvp-form.html',
  styleUrl: './rsvp-form.scss',
})
export class RsvpForm {
  private service = inject(RsvpService);

  invite = input<Invite | null>(null);

  submitted = output<void>();

  attending = signal<boolean | null>(null);
  guestNames = signal<string[]>([]);
  message = signal('');
  contactInfo = signal('');

  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  guestCount = computed(() => this.invite()?.guests ?? 0);
  isSubmitted = computed(() => this.invite()?.used === true);

  canSubmit = computed(() =>
      this.attending() !== null &&
      !this.isSubmitted() &&
      !this.loading()
  );

  // 🔁 init guests
  initGuestsEffect = effect(() => {
    const invite = this.invite();
    if (!invite) return;

    const count = invite.guests ?? 0;
    const arr = Array(count).fill('');

    if (count > 0) {
      arr[0] = invite.name;
    }

    this.guestNames.set(arr);
  });

  updateGuest(index: number, value: string) {
    const copy = [...this.guestNames()];
    copy[index] = value;
    this.guestNames.set(copy);
  }

  submit() {
    if (!this.canSubmit()) return;

    const invite = this.invite();
    if (!invite) return;

    this.loading.set(true);
    this.error.set(null);

    const payload = {
      code: invite.code,
      attending: this.attending(),
      guestNames: this.guestNames().join(','),
      message: this.message(),
      contactInfo: this.contactInfo()
    };

    this.service.submit(payload).subscribe({
      next: (res) => {
        if (!res.success) {
          this.error.set(res.error || 'Submission failed');
          return;
        }

        this.success.set(true);
        this.submitted.emit();
      },
      error: () => this.error.set('Network error'),
      complete: () => this.loading.set(false)
    });
  }
}