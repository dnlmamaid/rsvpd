import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RsvpPayload } from '../../features/rsvp/rsvp.types';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RsvpService {
    private http = inject(HttpClient);

    private apiUrl = 'YOUR_SCRIPT_URL_HERE';

    submit(payload: RsvpPayload) {
        return this.http.post<{ success: boolean; error?: string }>(
            this.apiUrl,
            payload
        ).pipe(
            retry(1),
            catchError(err => {
                console.error('API error:', err);
                return throwError(() => err);
            })
        );
    }
}