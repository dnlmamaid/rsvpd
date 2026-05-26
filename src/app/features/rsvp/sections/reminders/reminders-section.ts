import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-reminders-section',
  imports: [CommonModule],
  templateUrl: './reminders-section.html',
  styleUrl: './reminders-section.scss',
})
export class RemindersSection {
  readonly title = 'Paalala';

  readonly coupleImage = {
    backgroundImage: `url(assets/images/dan-pat.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };



  readonly leadLines = [
    'Huwag kalimutang mag-RSVP',
    'bago o sa ika-23 ng Nobyembre 2026.',
  ];
  readonly assist = `Para sa iba pang katanungan, message niyo lang kami.`;
  readonly closing = `Kitakits sa araw ng aming pag-iisang dibdib!`;
}
