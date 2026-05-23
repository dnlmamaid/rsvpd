import { Component, signal } from "@angular/core";
import { LucideAngularModule } from "lucide-angular";

interface Venue {
  label: string;
  name: string;
  description: string;
  image: string;
  address: string;
  maps: string;
}

@Component({
  selector: "app-location-section",
  imports: [LucideAngularModule],
  templateUrl: "./location-section.html",
  styleUrl: "./location-section.scss",
})
export class LocationSection {
  readonly title = signal("Lokasyon");

  readonly subtitle = signal(
    "Narito ang mga lugar para sa seremonya at salu-salo."
  );

  readonly venues = signal<Venue[]>([
    {
      label: "Seremonya",
      name: "Our Lady of Mt. Carmel Parish",
      description: "Dito gaganapin ang pag-iisang dibdib.",
      image: "assets/images/church-carmel.png",
      address: "Sabang, XW89+M2R, Baliwag, Bulacan",
      maps: "https://maps.app.goo.gl/7mV1wLzxuCSYDnFP9"
    },
    {
      label: "Salu-salo",
      name: "Maravilloza Events Place",
      description: "Dito susundan ang salu-salo at pagdiriwang.",
      image: "assets/images/reception-maravilloza.png",
      address: "M. H. Del Pilar, Dampol I, Pulilan, 3005 Bulacan",
      maps: "https://maps.app.goo.gl/bAYzQcj3xDUmVLBz6"
    },
  ]);
}
