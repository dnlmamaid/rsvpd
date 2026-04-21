import { Component, signal, AfterViewInit } from '@angular/core';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-bottom-nav',
  imports: [LucideAngularModule],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss'
})
export class BottomNav implements AfterViewInit {
  active = signal('hero');

  sections = ['hero', 'entourage', 'location', 'rsvp'];

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