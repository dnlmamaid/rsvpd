import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RsvpPayload } from '../../features/rsvp/rsvp.types';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RsvpService {
    private http = inject(HttpClient);

    private apiUrl = 'https://script.google.com/macros/s/AKfycbwz26clf_l0L8alC4awVk6kEbygSNdebUI-55YkPqeA8St4sCoRA5ZTu6mk62PZoRa2Mg/exec';

    submit(payload: RsvpPayload) {

        const body = new URLSearchParams();

        Object.entries(payload).forEach(([key, value]) => {
            body.set(key, String(value ?? ''));
        });

        return this.http.post<{ success: boolean; error?: string }>(
            this.apiUrl,
            body.toString(),
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        ).pipe(
            retry(1),
            catchError(err => {
                console.error('API error:', err);
                return throwError(() => err);
            })
        )
    }
}