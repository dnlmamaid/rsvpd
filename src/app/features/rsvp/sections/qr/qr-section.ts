import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";

interface QrCode {
  title: string;
  image: string;
}

@Component({
  selector: "app-qr-section",
  imports: [CommonModule],
  standalone: true,
  templateUrl: "./qr-section.html",
  styleUrl: "./qr-section.scss",
})
export class QrSection {
  readonly backgroundStyle = {
    backgroundImage: `url(assets/images/bg-4.png)`
  };

  readonly title = signal("Handog sa mag-irog");

  readonly subtitle = signal(
    "Ang tunay na yaman para sa amin ay ang inyong pagmamahal at suporta."
  );

  readonly message = signal(
    "Kung nais ninyong magbahagi, maaari ninyong gamitin ang QR code sa ibaba para sa aming bagong simula."
  );

  readonly qrCodes = signal<QrCode[]>([
    {
      title: "BPI",
      image: "assets/images/qr-dan-bpi.png"
    },
    {
      title: "GoTyme",
      image: "assets/images/qr-dan-gotyme.png"
    },
    {
      title: "GCash",
      image: "assets/images/qr-pat-gcash.png"
    },
    {
      title: "Maya",
      image: "assets/images/qr-pat-maya.png"
    }
  ]);
}
