import {Component, inject, signal} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {createRsvpForm} from "./rsvp.form";
import {RsvpService} from "../../core/services/rsvp.service";
import {HeroSection} from "./sections/hero/hero-section";
import {EntourageSection} from "./sections/entourage/entourage-section";
import {LocationSection} from "./sections/location/location-section";
import {RsvpForm} from "./sections/rsvp-form/rsvp-form";
import {BottomNav} from "./components/bottom-nav/bottom-nav";

@Component({
  selector: "app-rsvp",
  imports: [ReactiveFormsModule,HeroSection,EntourageSection,LocationSection,RsvpForm,BottomNav],
  templateUrl: "./rsvp.page.html",
  styleUrl: "./rsvp.page.scss",
})
export class RsvpPage {
  private fb = inject(FormBuilder);
  private service = inject(RsvpService);

  loading = signal(false);
  success = signal(false);

  form = createRsvpForm(this.fb);

  submit() {
    if (this.form.invalid) return;

    console.log('Payload:', this.form.getRawValue());

    // temp simulation
    this.loading.set(true);

    this.service.submit(this.form.getRawValue())
        .subscribe({
          next: (res) => {
            if (!res.success) {
              alert(res.error || 'Submission failed');
              return;
            }

            this.success.set(true);

            this.form.reset({
              name: '',
              email: '',
              attending: true,
              guests: 1,
              message: '',
              honeypot: ''
            });
          },
          error: () => {
            alert('Network error');
          },
          complete: () => this.loading.set(false)
        });
  }
}
