import {Component, inject, signal} from "@angular/core";
import {Router} from "@angular/router";
@Component({
  selector: "app-invite-code",
  imports: [],
  templateUrl: "./invite-code.html",
  styleUrl: "./invite-code.scss",
})
export class InviteCode {
  private readonly router = inject(Router);

  readonly code = signal('');

  submit() {
    const value = this.code().trim();

    if (!value) return;

    this.router.navigate(['/rsvp'], {
      queryParams: { code: value }
    });
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const value = input.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, ''); // optional: restrict to alphanumeric

    this.code.set(value);
  }
}
