import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RsvpService } from '../../../../core/services/rsvp.service';
import { Invite } from '../../rsvp.types';

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

  // 🔥 UI state
  attending = signal<boolean | null>(null);
  guestNames = signal<string[]>([]);
  message = signal('');
  contactInfo = signal('');

  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  // 🔥 derived
  guestCount = computed(() => this.invite()?.guests ?? 0);

  showGuestInputs = computed(() =>
    this.attending() === true && this.guestCount() > 1
  );

  isSubmitted = computed(() => this.invite()?.used === true);

  canSubmit = computed(() =>
    this.attending() !== null &&
    !this.isSubmitted() &&
    !this.loading()
  );

  // 🔥 initialize guests ONCE per invite
  private lastCode = '';

  initGuestsEffect = effect(() => {
    const invite = this.invite();
    if (!invite) return;

    // prevent re-initializing if same invite
    if (this.lastCode === invite.code) return;

    this.lastCode = invite.code;

    const count = invite.guests ?? 0;

    if (count <= 1) {
      this.guestNames.set([]);
      return;
    }

    const arr = Array(count).fill('');
    arr[0] = invite.name;

    this.guestNames.set(arr);
  });

  updateGuest(index: number, value: string) {
    this.guestNames.update(list => {
      const copy = [...list];
      copy[index] = value;
      return copy;
    });
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
      guestNames:
        this.guestCount() > 1 ? this.guestNames().join(',') : '',
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
      error: () => {
        this.error.set('Network error');
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
}