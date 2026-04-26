import { Component, signal } from "@angular/core";

interface FaqItem {
  question: string;
  answers: string[];
}

@Component({
  selector: "app-faq-section",
  imports: [],
  templateUrl: "./faq-section.html",
  styleUrl: "./faq-section.scss",
})
export class FaqSection {
  readonly title = 'Mga Katanungan';

  readonly faqs = signal<FaqItem[]>([
    {
      question: 'Puwede bang magdala ng kasama o mga bata?',
      answers: [
        'Dahil limitado ang upuan, inaasahan namin ang mga taong nakalista lamang sa inyong imbitasyon.',
        'Salamat po sa pang-unawa!'
      ]
    },
    {
      question: 'Saan maaaring pumarada?',
      answers: [
        'Elevated ang simbahan at nasa labas ng gated compound ang parking kaya kailangang maglakad nang bahagya.',
        'Kapag nakaharap sa bukana ng simbahan, nasa kaliwang bahagi ang parking (San Francisco cor. San Juan Sts.).',
        'Sa Maravilloza naman, pumasok sa brown gate at bubungad ang malawak na parking.',
        'May nakalaan ding slots para sa seniors at PWD guests.'
      ]
    },
    {
      question: 'Ano ang dapat isuot?',
      answers: [
        'Semi-formal attire inspired by Filipiniana o Barong ang hinihiling naming suotin ninyo.',
        'Piliin ang kasuotang magaan at komportable.'
      ]
    },
    {
      question: 'Paano kung may allergies sa pagkain?',
      answers: [
        'Ipagbigay alam agad sa amin upang masabihan ang caterer para sa pag-customize ng menu para sa inyo.'
      ]
    }
  ]);
}
