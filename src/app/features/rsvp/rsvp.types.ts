export interface Invite {
    code: string;
    name: string;
    contact: string;
    attending: string | null;
    guests: number;
    guestNames: string;
    message: string;
    guestType: 0 | 1 | 2;
    used: boolean;
}

export interface SubmitRsvpPayload {
    code: string;
    attending: boolean | null;
    guestNames: string;
    message?: string;
    contactInfo?: string;
}
