import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";

interface ProgramItem {
  title: string;
  description: string;
}

@Component({
  selector: "app-program-section",
  imports:[CommonModule],
  standalone: true,
  templateUrl: "./program-section.html",
  styleUrl: "./program-section.scss",
})
export class ProgramSection {
  readonly backgroundStyle = {
    backgroundImage: `url(assets/images/program-bg.png)`
  };

  readonly title = signal("Programa");

  readonly items = signal<ProgramItem[]>([
    {
      title: "Meryenda at Salubong",
      description: "Maaaring maglibot sa hardin o pumasok sa loob ng Pavilion."
    },
    {
      title: "Hapunan at Kuwentuhan",
      description: "Mag-uumpisa ang reception ng 6:00 ng gabi."
    },
    {
      title: "Kantahan at Sayawan",
      description: "Maghandang makisaya sa gabing puno ng musika!"
    }
  ]);
}