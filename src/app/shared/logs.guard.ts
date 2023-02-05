import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LogsGuard implements CanActivate {

  constructor(private readonly tokenSvc: TokenService, private router: Router) { }
  // https://youtu.be/nC-do8ceLWY?list=PL4vWncexIMYvaYdepQvyryGBhIHU-Sd04&t=1501
  canActivate(): boolean | UrlTree {
    return this.tokenSvc.isLogged() || this.router.parseUrl('home');
  }

}
