import {Component, inject, signal} from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RsvpService} from "../../../../core/services/rsvp.service";

@Component({
  selector: "app-rsvp-form",
  imports: [ReactiveFormsModule],
  templateUrl: "./rsvp-form.html",
  styleUrl: "./rsvp-form.scss",
})
export class RsvpForm {
  private fb = inject(FormBuilder);
  private service = inject(RsvpService);

  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    attending: [true],
    guests: [1, [Validators.min(0), Validators.max(10)]],
    message: [''],
    honeypot: [''] // hidden field
  });

  submit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    this.service.submit(this.form.getRawValue()).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        this.form.reset({ attending: true, guests: 1 });
      },
      error: (err) => {
        this.error.set('Something went wrong. Try again.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }
}
