import { Component } from '@angular/core';

@Component({
  selector: 'app-reminders-section',
  templateUrl: './reminders-section.html',
  styleUrl: './reminders-section.scss',
})
export class RemindersSection {
  readonly title = 'Paalaala';

  // Provide the background image URL as a style binding value (must include url(...))
  readonly photoUrl = "url('/assets/images/dan-pat.jpg')";
}
