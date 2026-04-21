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
}
