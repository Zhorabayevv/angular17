export interface ILoginResponse {
    phone?: string | null;
    email?: string | null;
    password: string | null;
    rememberMe: boolean;
}

export type ILoginContentType = 'auth' | 'register' | 'success-reg';
