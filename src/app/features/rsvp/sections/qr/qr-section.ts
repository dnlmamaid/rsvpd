import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";

@Component({
  selector: "app-qr-section",
  imports: [CommonModule],
  standalone: true,
  templateUrl: "./qr-section.html",
  styleUrl: "./qr-section.scss",
})
export class QrSection {
  readonly backgroundStyle = {
    backgroundImage: `url(/assets/images/bg-4.png)`
  };

  readonly title = signal("Handog sa mag-irog");

  readonly subtitle = signal(
    "Ang tunay na yaman para sa amin ay ang inyong pagmamahal at suporta."
  );

  readonly message = signal(
    "Kung nais ninyong magbahagi, maaari ninyong gamitin ang QR code sa ibaba para sa aming bagong simula."
  );

  readonly qrImage = signal("/assets/images/qr-code.png");
}