export interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

export interface User {
    id: string;
    name: string;
    password: string;
    email: string;
}
