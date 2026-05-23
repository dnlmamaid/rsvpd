import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Invite, SubmitRsvpPayload} from '../../features/rsvp/rsvp.types';
import {Observable} from 'rxjs';

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}
@Injectable({providedIn: 'root'})
export class RsvpService {
    private http = inject(HttpClient);

    private readonly apiUrl = 'https://script.google.com/macros/s/AKfycbyteYa-doPf8z4oD89IVW46UpiIwZbBPzsZ5ul14xxWBXwRV3MpBPEt3dPcYpa9Ul80Nw/exec';

    /**
     * GET invite by code
     */
    getInvite(code: string): Promise<ApiResponse<Invite>> {
        return fetch(`${this.apiUrl}?code=${code}`)
            .then(res => res.json());
    }

    /**
     * POST RSVP submission
     */
    submit(payload: SubmitRsvpPayload): Observable<ApiResponse> {
        let body = new HttpParams()
            .set('code', payload.code ?? '')
            .set('attending', String(payload.attending))
            .set('guestNames', payload.guestNames ?? '')
            .set('message', payload.message ?? '')
            .set('contactInfo', payload.contactInfo ?? '')
            .set('honeypot', '');

        return this.http.post<ApiResponse>(this.apiUrl, body.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

}