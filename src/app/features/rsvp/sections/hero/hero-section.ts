import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  readonly monogramImage = 'assets/images/monogram.png';

  readonly introLineOne = 'Sa wakas!';
  readonly introLineTwo = 'Ikaw ay malugod na iniimbitahan sa';

  readonly weddingLabel = 'Kasalang';
  readonly names = 'DANIEL & PATRICIA';

  readonly date = 'Enero 20, 2027';

  readonly dayTime = 'Miyerkoles • 1:30 ng Hapon';
  readonly ceremonyVenue = 'Our Lady of Mt. Carmel Parish';
  readonly ceremonyAddress = 'Sabang, Baliuag, Bulacan';

  readonly receptionIntro = 'Ito ay susundan ng salusalo sa';
  readonly receptionVenue = 'Maravilloza Events Center';
  readonly receptionAddress = 'Dampol, Pulilan, Bulacan';
}