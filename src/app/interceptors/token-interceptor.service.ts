import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Jwt } from '../shared/models/jwt';

const AUTHORIZATION = environment.AUTHORIZATION;
const BEARER = environment.BEARER;

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private readonly tokenService: TokenService,
    private readonly authSvc: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();
    // Si el token existe, lo añadimos al encabezado Authorization
    if (token != null) {
      intReq = req.clone({ headers: req.headers.set(AUTHORIZATION, BEARER + token) });
    }
    // return next.handle(intReq);
    return next.handle(intReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el token ha expirado (401)
        if (error.status === 401) {
          // Intenta obtener un nuevo token usando el refresh token
          return this.authSvc.refreshToken(new Jwt(token)).pipe(
            switchMap((data: Jwt) => {
              // Al recibir el nuevo token, lo guardamos
              this.tokenService.setToken(data.token);
              
              // Ahora repetimos la solicitud original con el nuevo token
              intReq = req.clone({ headers: req.headers.set(AUTHORIZATION, BEARER + data.token) });
              return next.handle(intReq); // Retorna la solicitud con el nuevo token
            })
          );
        } else {
          return throwError(() => new Error('Something went wrong'));
        }
      })
    );
  }
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}];
