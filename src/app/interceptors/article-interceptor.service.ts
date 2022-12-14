import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

const AUTHORIZATION = environment.AUTHORIZATION;
const BEARER = environment.BEARER;

@Injectable({
  providedIn: 'root'
})
export class ArticleInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      intReq = req.clone({ headers: req.headers.set(AUTHORIZATION, BEARER + token) });
    }
    return next.handle(intReq);
  }
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ArticleInterceptorService, multi: true}];
