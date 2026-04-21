import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingStore {
  private _loading = signal(false);
  private _message = signal('Loading...');

  readonly loading = this._loading.asReadonly();
  readonly message = this._message.asReadonly();

  show(message = 'Loading...') {
    this._message.set(message);
    this._loading.set(true);
  }

  hide() {
    this._loading.set(false);
  }
}