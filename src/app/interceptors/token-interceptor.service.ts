import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Jwt } from '../shared/models/jwt';

const AUTHORIZATION = environment.AUTHORIZATION;
const BEARER = environment.BEARER;

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authSvc: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      intReq = req.clone({ headers: req.headers.set(AUTHORIZATION, BEARER + token) });
    }
    return next.handle(intReq).pipe(catchError((error: HttpErrorResponse) => {
      // Si token ha expirado (status 401), refrescar token.
      if(error.status === 401){
        this.authSvc.refreshToken(new Jwt(token)).subscribe((data: Jwt) => {
          this.tokenService.setToken(data.token);
        });
        return throwError(() => new Error());
      }else{
        return throwError(() => new Error('Something was wrong ...'));
      }     
    }));
  }
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}];
