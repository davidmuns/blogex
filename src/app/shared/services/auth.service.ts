import { Jwt } from './../models/jwt';
import { Login } from './../models/login';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public signupUser(user: User): Observable<any> {
    user.email = user.email?.trim();
    user.nombreUsuario = user.nombreUsuario?.trim();
    user.password = user.password.trim();
    return this.httpClient.post<any>(environment.BACKEND_BASE_URL + 'auth/nuevo', user);
  }

  public loginUser(login: Login): Observable<any> {
    // ¿Encriptar password del lado del cliente? 
    // https://www.youtube.com/watch?v=fzwkkZp5WcE
    // console.log(CryptoJS.AES.encrypt(login.password, 'pass').toString());
    login.nombreUsuario = login.nombreUsuario.trim();
    login.password = login.password.trim();
    return this.httpClient.post<any>(environment.BACKEND_BASE_URL + 'auth/login', login);
  }

  public updateUser(userId: number, user: User): Observable<any>{
    user.email = user.email?.trim();
    return this.httpClient.put<any>(environment.BACKEND_BASE_URL + `user/${ userId } `, user);  
  }

  public getUserByTokenPassword(tokenPassword: string): Observable<any> {
    return this.httpClient.get<any>(environment.BACKEND_BASE_URL + 'auth/user/' + tokenPassword);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<any>(environment.BACKEND_BASE_URL + 'user/' + username);
  }

  public refreshToken(jwt: Jwt): Observable<Jwt> {
    return this.httpClient.post<Jwt>(environment.BACKEND_BASE_URL + 'auth/refresh', jwt);
  }

  public deleteAccount(username: string): Observable<any> {
    return this.httpClient.delete(environment.BACKEND_BASE_URL + 'user/' + username)
  }
} 
