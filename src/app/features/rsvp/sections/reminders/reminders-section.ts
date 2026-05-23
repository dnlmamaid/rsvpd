import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-reminders-section',
  imports: [CommonModule],
  templateUrl: './reminders-section.html',
  styleUrl: './reminders-section.scss',
})
export class RemindersSection {
  readonly title = 'Paalaala';

  // Provide the background style object (program-section pattern)
  readonly backgroundStyle = {
    backgroundImage: `url(assets/images/dan-pat.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
}

