import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private AUTH_HEADER = 'Authorization';
    private token: string;

    constructor(private authService: AuthService,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.authService.getToken();

        if ( !req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {

                    this.authService.logout();
                    this.router.navigate(['/login']);
                    return throwError(error);
                }
                if (error && error.status === 500) {
                    this.router.navigate(['/500']);
                }
                if (error && error.status === 404) {
                    this.router.navigate(['/404']);
                }
                this.snackBar.open(error.error.error.message, 'Close', {
                    duration: 2000
                });
                return throwError(error);
            })
        );
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        if ( !this.token) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        if ( !request.url.match(/snarchio.ddns.net:3001\//)) {
            return request;
        }
        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
        });
    }
}
