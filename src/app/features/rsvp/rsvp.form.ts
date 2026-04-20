import { FormBuilder, Validators } from '@angular/forms';

export function createRsvpForm(fb: FormBuilder) {
    return fb.nonNullable.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        attending: [true, Validators.required],
        guests: [1, [Validators.required, Validators.min(0)]],
        message: ['']
    });
}