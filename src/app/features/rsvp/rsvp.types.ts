export interface RsvpPayload {
    name: string;
    email: string;
    attending: boolean;
    guests: number;
    message?: string;
    honeypot?: string;
}