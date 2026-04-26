import { Component } from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-hero-section",
  imports: [CommonModule],
  templateUrl: "./hero-section.html",
  styleUrl: "./hero-section.scss",
})
export class HeroSection {
  readonly backgroundStyle = {
    backgroundImage: `url(assets/images/hero-bg.png)`
  };

  readonly title = 'Daniel at Patricia';
  readonly date = 'Enero 20, 2027 • 1:30 ng Hapon';
  readonly location = 'Our Lady of Mt. Carmel Parish\n' +
    '          Sabang, Baliuag, Bulacan';
}
