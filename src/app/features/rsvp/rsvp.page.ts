import { Component, inject, signal, effect } from "@angular/core";
import { RsvpService } from "../../core/services/rsvp.service";
import { HeroSection } from "./sections/hero/hero-section";
import { EntourageSection } from "./sections/entourage/entourage-section";
import { LocationSection } from "./sections/location/location-section";
import { RsvpForm } from "./sections/rsvp-form/rsvp-form";
import { BottomNav } from "./components/bottom-nav/bottom-nav";
import {Invite} from "./rsvp.types";

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
  private service = inject(RsvpService);

  // 🔥 GLOBAL STATE
  invite = signal<Invite | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadInvite();
  }

  onSubmitted() {
    this.invite.update(i =>
        i ? { ...i, used: true } : i
    );
  }

  private loadInvite() {
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      this.error.set("Missing invite code");
      return;
    }

    this.loading.set(true);

    this.service.getInvite(code).then(res => {
      if (!res.success) {
        console.error(res.error);
        return;
      }

      this.invite.set(res.data ?? null);
    });
  }
}