import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

interface Venue {
  label: string;
  name: string;
  image: string;
  address: string;
  maps: string;
}

@Component({
  selector: 'app-location-section',
  imports: [LucideAngularModule],
  templateUrl: './location-section.html',
  styleUrl: './location-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSection {
  readonly title = signal('Lokasyon');

  readonly mapIconName = 'map-pin';
  readonly mapIconSize = 20;

  readonly venues = signal<Venue[]>([
    {
      label: 'Seremonya',
      name: 'Our Lady of Mt. Carmel Parish',
      image: 'assets/images/church-carmel.png',
      address: 'Sabang, Baliwag, Bulacan',
      maps: 'https://maps.app.goo.gl/bAYzQcj3xDUmVLBz6',
    },
    {
      label: 'Salusalo',
      name: 'Maravilloza Events Center',
      image: 'assets/images/reception-maravilloza.png',
      address: 'Dampol I, Pulilan, Bulacan',
      maps: 'https://maps.app.goo.gl/7mV1wLzxuCSYDnFP9',
    },
  ]);

  getMapAriaLabel(venue: Venue): string {
    return `Open ${venue.name} in Google Maps`;
  }
}