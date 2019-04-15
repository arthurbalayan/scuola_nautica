import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn: boolean;
    token: string | undefined;
    redirectUrl: string; // store the URL so we can redirect after logging in

    constructor(private http: HttpClient,
                @Inject(LOCAL_STORAGE) private storage: StorageService) {

        this.token = this.getToken();
        this.isLoggedIn = !!this.token;
    }

    /**
     * @description login send username password to server get token store local storage
     * @param data username password
     * @return Observable<boolean> true if authorized else false
     */
    login(data: { username: string, password: string }): Observable<boolean> {
        return this.http.post<User>(environment.apiUrl + 'login', data)
            .pipe(map(val => {
                if (val.token) {
                    this.storage.set('token', val.token);
                    this.isLoggedIn = true;
                    return true;
                } else {
                    return false;
                }
            }));
    }

    /**
     * @description logout the user, delete JWT
     */
    logout(): void {
        this.storage.remove('token');
        this.isLoggedIn = false;
    }

    /**
     * @description get token value
     */
    getToken(): string {
        return this.storage.get('token');
    }
}
