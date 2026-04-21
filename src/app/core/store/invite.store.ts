import { Injectable, signal, computed } from '@angular/core';
import { Invite } from '../../features/rsvp/rsvp.types';

@Injectable({
  providedIn: 'root'
})
export class InviteStore {
  private readonly _invite = signal<Invite | null>(null);

  readonly invite = this._invite.asReadonly();

  readonly isLoaded = computed(() => !!this._invite());
  readonly isUsed = computed(() => this._invite()?.used === true);

  setInvite(invite: Invite) {
    this._invite.set(invite);
  }

  updateInvite(patch: Partial<Invite>) {
    this._invite.update(current =>
        current ? { ...current, ...patch } : current
    );
  }

  clear() {
    this._invite.set(null);
  }
}