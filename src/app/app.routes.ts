import { Routes } from '@angular/router';
import {inviteGuard} from "./core/guards/invite-guard";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/rsvp/rsvp.page').then(m => m.RsvpPage),
        canActivate: [inviteGuard]
    }
];