import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ILoginResponse } from '../interfaces/login.interface';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private loggedIn$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private _http: HttpClient) {}

    public get isLoggedIn(): Observable<boolean> {
        return this.loggedIn$$.asObservable();
    }

    public login(body: ILoginResponse): Observable<ILoginResponse> {
        localStorage.setItem('access_token', '123');

        this.loggedIn$$.next(true);

        return this._http.post<ILoginResponse>('/login', body);
    }

    public logout(): void {
        localStorage.clear();
        this.loggedIn$$.next(false);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('access_token');
    }
}
