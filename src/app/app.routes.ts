import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/landing/invite-code/invite-code').then(m => m.InviteCode),
    },
    {
        path: 'rsvp',
        loadComponent: () =>
            import('./features/rsvp/rsvp.page').then(m => m.RsvpPage),
    },
    {
        path: '**',
        redirectTo: '',
    }
];