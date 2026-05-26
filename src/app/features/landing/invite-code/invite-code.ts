import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { RsvpService } from "../../../core/services/rsvp.service";
import { InviteStore } from "../../../core/store/invite.store";
import {LoadingStore} from "../../../core/store/loading.store";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-invite-code",
  imports: [CommonModule],
  templateUrl: "./invite-code.html",
  styleUrl: "./invite-code.scss",
})
export class InviteCode {
  private router = inject(Router);
  private service = inject(RsvpService);
  private store = inject(InviteStore);
  private loadingStore = inject(LoadingStore);

  readonly copy = {
    title: 'Isang Paanyaya!',
    subtitle: 'itala ang iyong invitation code',
    loadingButton: 'Inihahanda ang iyong paanyaya...',
    submitButton: 'Magpatuloy',
  } as const;

  readonly confettiPieces = Array.from({ length: 64 }, (_, index) => index);

  code = signal('');
  loading = this.loadingStore.loading;
  error = signal<string | null>(null);
  opening = signal<boolean>(false);

  async submit() {
    const value = this.code().trim();
    if (!value || this.loading() || this.opening()) return;

    this.loadingStore.show('Hinahanap ang iyong paanyaya...');
    this.error.set(null);

    try {
      const res = await this.service.getInvite(value);

      if (!res.success || !res.data) {
        this.error.set('Walang paanyayang nakita.');
        return;
      }

      this.store.setInvite(res.data);
      this.opening.set(true);

      setTimeout(() => {
        this.router.navigate(['/rsvp'], {
          queryParams: { code: value },
        });
      }, 1500);
    } catch {
      this.error.set('Something went wrong');
    } finally {
      this.loadingStore.hide();
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const value = input.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '');

    this.code.set(value);
  }
}
