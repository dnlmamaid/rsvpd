import {Component, inject, signal} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {createRsvpForm} from "./rsvp.form";

@Component({
  selector: "app-rsvp",
  imports: [ReactiveFormsModule],
  templateUrl: "./rsvp.page.html",
  styleUrl: "./rsvp.page.scss",
})
export class RsvpPage {
  private fb = inject(FormBuilder);

  loading = signal(false);
  success = signal(false);

  form = createRsvpForm(this.fb);

  submit() {
    if (this.form.invalid) return;

    console.log('Payload:', this.form.getRawValue());

    // temp simulation
    this.loading.set(true);

    setTimeout(() => {
      this.success.set(true);
      this.loading.set(false);
      this.form.reset({
        name: '',
        email: '',
        attending: true,
        guests: 1,
        message: ''
      });
    }, 1000);
  }
}
