import { Login } from './../models/login';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Jwt } from '../models/jwt';

const AUTH_URL = environment.AUTH_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public signupUser(user: User): Observable<any>{
    return this.httpClient.post<any>(AUTH_URL + 'nuevo', user);
  }

  public loginUser(login: Login): Observable<any> {
    return this.httpClient.post<any>(AUTH_URL + 'login', login);
  }

  public getUserByTokenPassword(tokenPassword: string): Observable<any> {
    return this.httpClient.get<any>(AUTH_URL + 'user/' + tokenPassword);
  }
} 
