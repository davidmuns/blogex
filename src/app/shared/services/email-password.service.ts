import { ResetPassword } from './../models/reset-password';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../models/email';


const EMAIL_PASSWORD_URL = environment.EMAIL_PASSWORD_URL;

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  constructor(private httpClient: HttpClient) { }

  public sendEmail(email: Email): Observable<any> {
    return this.httpClient.post<any>(EMAIL_PASSWORD_URL + 'send', email);
  }

  public resetPassword(resetPassword: ResetPassword): Observable<any> {
    resetPassword.newPassword = resetPassword.newPassword.trim();
    console.log('pass:', resetPassword.newPassword);
    
    resetPassword.confirmPassword = resetPassword.confirmPassword.trim();
    return this.httpClient.post<any>(EMAIL_PASSWORD_URL + 'reset', resetPassword);
  }
}
