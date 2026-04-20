import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/rsvp/rsvp.page').then(m => m.RsvpPage)
    }
];