import { User } from '../routes/index.d';

export interface AppointmentRequest {
    provider_id: string;
    date: Date;
}

export interface UserRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface UpdateAvatarRequest {
    user_id: string;
    avatarFilename: string;
}
