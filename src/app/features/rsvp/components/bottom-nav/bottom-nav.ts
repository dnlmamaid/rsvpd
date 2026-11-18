import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { CustomIcon } from "../custom-icon/custom-icon";

interface NavItem {
  id: string;
  label: string;
  icon?: string;
  image?: string;
  alt?: string;
}

const NORMAL_ITEMS: readonly NavItem[] = [
  { id: "hero", label: "Simula", icon: "house" },
  { id: "location", label: "Lugar", icon: "map-pin" },
  {
    id: "attire",
    label: "Kasuotan",
    image: "assets/icons/filipino-salakot-icon.svg",
    alt: "Attire",
  },
  { id: "rsvp", label: "RSVP", icon: "pen-tool" },
];

const DECLINED_ITEMS: readonly NavItem[] = [
  { id: "rsvp", label: "RSVP", icon: "pen-tool" },
  { id: "qr", label: "Handog", icon: "gift" },
  { id: "reminders", label: "Paalala", icon: "heart" },
];

@Component({
  selector: "app-bottom-nav",
  imports: [LucideAngularModule, CustomIcon],
  templateUrl: "./bottom-nav.html",
  styleUrl: "./bottom-nav.scss",
})
export class BottomNav implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private observer: IntersectionObserver | null = null;
  private viewInitialized = false;
  private destroyed = false;
  private observationVersion = 0;

  readonly declined = input(false);
  active = signal("hero");

  readonly items = computed(() =>
    this.declined() ? DECLINED_ITEMS : NORMAL_ITEMS,
  );

  private readonly itemsEffect = effect(() => {
    const sectionIds = this.items().map((item) => item.id);

    if (!this.viewInitialized) {
      return;
    }

    this.scheduleObservation(sectionIds);
  });

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.scheduleObservation(this.items().map((item) => item.id));
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.observer?.disconnect();
  }

  private scheduleObservation(sectionIds: string[]) {
    const version = ++this.observationVersion;

    queueMicrotask(() => {
      if (this.destroyed || version !== this.observationVersion) {
        return;
      }

      this.observeSections(sectionIds);
    });
  }

  private observeSections(sectionIds: string[]) {
    this.observer?.disconnect();
    this.active.set(sectionIds[0] ?? "");

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.active.set(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    sectionIds.forEach((id) => {
      const el = this.document.getElementById(id);
      if (el) this.observer?.observe(el);
    });
  }

  scrollTo(id: string) {
    this.document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  }
}
