import { Jwt } from './../models/jwt';
import { Login } from './../models/login';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js'; 

const AUTH_URL = environment.AUTH_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public signupUser(user: User): Observable<any>{
    user.email = user.email?.trim();
    user.nombreUsuario = user.nombreUsuario?.trim();
    user.password = user.password.trim();
    return this.httpClient.post<any>(AUTH_URL + 'nuevo', user);
  }

  public loginUser(login: Login): Observable<any> {
    // ¿Encriptar password del lado del cliente? 
    // https://www.youtube.com/watch?v=fzwkkZp5WcE
    // console.log(CryptoJS.AES.encrypt(login.password, 'pass').toString());
    login.nombreUsuario = login.nombreUsuario.trim();
    login.password = login.password.trim();
    return this.httpClient.post<any>(AUTH_URL + 'login', login);
  }

  public getUserByTokenPassword(tokenPassword: string): Observable<any> {
    return this.httpClient.get<any>(AUTH_URL + 'user/' + tokenPassword);
  }

  public refreshToken(jwt: Jwt): Observable<Jwt>{
    return this.httpClient.post<Jwt>(AUTH_URL + 'refresh', jwt);
  }

  public deleteAccount(username: string): Observable<any>{
    console.log(`${environment.USER_BASE_URL}delete/${username}`);
    return this.httpClient.delete(`${environment.USER_BASE_URL}delete/${username}`)
  }
} 
