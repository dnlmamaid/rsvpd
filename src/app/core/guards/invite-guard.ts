import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RsvpService } from '../services/rsvp.service';

export const inviteGuard: CanActivateFn = async () => {
  const service = inject(RsvpService);

  const code = new URLSearchParams(window.location.search).get('code');

  // ❌ No code → redirect
  if (!code) {
    redirect();
    return false;
  }

  try {
    const res = await service.getInvite(code);

    if (!res.success || !res.data) {
      redirect();
      return false;
    }

    return true; // ✅ allow
  } catch {
    redirect();
    return false;
  }
};

function redirect() {
  window.location.href = 'https://www.youtube.com/watch?v=Aq5WXmQQooo';
}