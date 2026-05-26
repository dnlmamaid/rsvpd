import { Component, signal, AfterViewInit } from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import { CommonModule } from '@angular/common';
import {CustomIcon} from "../custom-icon/custom-icon";

interface NavItem {
  id: string;
  icon?: string;
  image?: string;
  alt?: string;
}

@Component({
  selector: 'app-bottom-nav',
  imports: [CommonModule, LucideAngularModule, CustomIcon],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss'
})
export class BottomNav implements AfterViewInit {
  active = signal('hero');

  readonly items: NavItem[] = [
    { id: 'hero', icon: 'house' },
    { id: 'location', icon: 'map-pin' },
    {
      id: 'attire',
      image: 'assets/icons/filipino-salakot-icon.svg',
      alt: 'Attire',
    },
    { id: 'rsvp', icon: 'pen-tool' },
  ];

  readonly sections = this.items.map(item => item.id);

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.active.set(entry.target.id);
            }
          });
        },
        { threshold: 0.6 }
    );

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
