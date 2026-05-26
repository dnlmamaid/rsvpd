import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

interface FaqItem {
  question: string;
  answers: string[];
}

@Component({
  selector: "app-faq-section",
  imports: [CommonModule],
  templateUrl: "./faq-section.html",
  styleUrl: "./faq-section.scss",
})
export class FaqSection {
  readonly title = 'Mga katanungan';

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
        'Maaari ring pumarada sa palibot ng gate ng simbahan, ngunit maging mindful na hindi makaaabala o makasasagabal sa daan.',
        'Sa Maravilloza naman, pumasok sa brown gate at bubungad ang malawak na parking.',
        'May nakalaan ding slots para sa seniors at PWD guests.'
      ]
    },
    {
      question: 'Ano ang dapat isuot?',
      answers: [
        'Ang tema ay pistang Filipino. Piliin ang kasuotang magaan at komportable sa inyo. Ngunit pakiusap, iwasan ang pagsuot ng maong na pantalon, shorts, slides, flip flops, o de goma na tsinelas. Makikita ang kasuotan sa pahina bago ito. ',
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
