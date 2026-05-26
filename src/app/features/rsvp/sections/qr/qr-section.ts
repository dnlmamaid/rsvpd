import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";

interface QrCode {
  title: string;
  image: string;
  imageAlt: string;
}

@Component({
  selector: "app-qr-section",
  imports: [CommonModule],
  standalone: true,
  templateUrl: "./qr-section.html",
  styleUrl: "./qr-section.scss",
})
export class QrSection {

  readonly title = signal("Handog sa mag-irog");

  readonly subtitle = signal(
    "Ang tunay na yaman para sa amin ay ang inyong pagmamahal at suporta."
  );

  readonly message = signal(
    "Ngunit kung nais ninyo talagang magbahagi, maaari ninyong gamitin ang mga QR code sa ibaba para sa aming bagong simula."
  );

  readonly qrCodes = signal<QrCode[]>([
    {
      title: "BPI",
      image: "assets/images/qr-dan-bpi.png",
      imageAlt: 'BPI QR Code',
    },
    {
      title: "GoTyme",
      image: "assets/images/qr-dan-gotyme.png",
      imageAlt: 'GoTyme QR Code',
    },
    {
      title: "GCash",
      image: "assets/images/qr-pat-gcash.png",
      imageAlt: 'GCash QR Code',
    },
    {
      title: "Maya",
      image: "assets/images/qr-pat-maya.png",
      imageAlt: 'Maya QR Code',
    }
  ]);
}
