import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingOverlay} from "./shared/ui/loading-overlay/loading-overlay";
import {LoadingStore} from "./core/store/loading.store";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingOverlay],
  template: `<router-outlet/>
             <app-loading-overlay
                [visible]="loadingStore.loading()"
                [message]="loadingStore.message()"
             />`,
})
export class App {
  readonly loadingStore = inject(LoadingStore);
}
