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
    // const {email, password} = user;
    // return this.http.post(email, password);
    return this.httpClient.post<any>(AUTH_URL + 'nuevo', user);
  }

  public loginUser(login: Login): Observable<Jwt> {
    return this.httpClient.post<Jwt>(AUTH_URL + 'login', login);
  }

  // loginByUserName(){
  //   this.http.get(environment.users);
  // } 
} 
