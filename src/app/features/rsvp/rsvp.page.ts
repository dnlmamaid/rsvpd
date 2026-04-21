import { Component, inject, signal, effect } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { RsvpService } from "../../core/services/rsvp.service";
import { InviteStore } from "../../core/store/invite.store";

import { HeroSection } from "./sections/hero/hero-section";
import { EntourageSection } from "./sections/entourage/entourage-section";
import { LocationSection } from "./sections/location/location-section";
import { RsvpForm } from "./sections/rsvp-form/rsvp-form";
import { BottomNav } from "./components/bottom-nav/bottom-nav";

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(RsvpService);
  private store = inject(InviteStore);

  invite = this.store.invite;

  loading = signal(true);
  error = signal<string | null>(null);

  // 🔥 main logic
  loadEffect = effect(() => {
    const code = this.route.snapshot.queryParamMap.get("code");

    // ❌ no code → go landing
    if (!code) {
      this.router.navigateByUrl('/');
      return;
    }

    // ✅ already loaded → skip API
    if (this.store.invite()?.code === code) {
      this.loading.set(false);
      return;
    }

    // 🔁 fetch fallback
    this.loading.set(true);

    this.service.getInvite(code)
        .then(res => {
          if (!res.success || !res.data) {
            this.router.navigateByUrl('/');
            return;
          }

          this.store.setInvite(res.data);
        })
        .catch(() => {
          this.router.navigateByUrl('/');
        })
        .finally(() => {
          this.loading.set(false);
        });
  });

  onSubmitted() {
    this.store.updateInvite({ used: true });
  }
}