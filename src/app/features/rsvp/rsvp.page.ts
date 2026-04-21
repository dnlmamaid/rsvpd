import { Component, inject, signal, effect } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RsvpService } from "../../core/services/rsvp.service";

import { HeroSection } from "./sections/hero/hero-section";
import { EntourageSection } from "./sections/entourage/entourage-section";
import { LocationSection } from "./sections/location/location-section";
import { RsvpForm } from "./sections/rsvp-form/rsvp-form";
import { BottomNav } from "./components/bottom-nav/bottom-nav";

import { Invite } from "./rsvp.types";

@Component({
  selector: "app-rsvp",
  standalone: true,
  imports: [
    HeroSection,
    EntourageSection,
    LocationSection,
    RsvpForm,
    BottomNav
  ],
  templateUrl: "./rsvp.page.html",
  styleUrl: "./rsvp.page.scss",
})
export class RsvpPage {
  // 🔥 Property-based DI
  private service = inject(RsvpService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // 🔥 State
  invite = signal<Invite | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // 🔥 Effect replaces constructor
  loadInviteEffect = effect(() => {
    const code = this.route.snapshot.queryParamMap.get("code");

    // ❌ No code → redirect
    if (!code) {
      this.router.navigateByUrl("/");
      return;
    }

    this.loading.set(true);

    this.service.getInvite(code)
        .then(res => {
          if (!res.success || !res.data) {
            this.router.navigateByUrl("/");
            return;
          }

          this.invite.set(res.data);
        })
        .catch(() => {
          this.router.navigateByUrl("/");
        })
        .finally(() => {
          this.loading.set(false);
        });
  });

  onSubmitted() {
    this.invite.update(i =>
        i ? { ...i, used: true } : i
    );
  }
}