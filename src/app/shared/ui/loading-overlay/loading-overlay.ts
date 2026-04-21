import { Component, input } from "@angular/core";

@Component({
  selector: "app-loading-overlay",
  imports: [],
  templateUrl: "./loading-overlay.html",
  styleUrl: "./loading-overlay.scss",
})
export class LoadingOverlay {
  visible = input<boolean>(false);
  message = input<string>('Loading...');
}
