 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /* signupUser(user: any){
    const {email, password} = user;
    return this.http.post(email, password);
  }

  loginByUserName(){
    this.http.get(environment.users);
  } */
} 
