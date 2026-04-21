import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {House, LucideAngularModule, Mail, MapPin, Users} from "lucide-angular";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(),
        provideClientHydration(withEventReplay()),
        importProvidersFrom(
            LucideAngularModule.pick({
                House,
                Users,
                MapPin,
                Mail
            })
        )
    ]
};
