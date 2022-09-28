import { User } from './../models/user';
 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const AUTH_URL = environment.AUTH_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signupUser(user: User): Observable<any>{
    // const {email, password} = user;
    // return this.http.post(email, password);
    return this.httpClient.post<any>(AUTH_URL + 'nuevo', user);
  }

  // loginByUserName(){
  //   this.http.get(environment.users);
  // } 
} 
