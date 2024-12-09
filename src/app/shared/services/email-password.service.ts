import { Email } from './../models/Email';
import { ResetPassword } from './../models/reset-password';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  constructor(private httpClient: HttpClient) { }

  public sendEmail(email: Email): Observable<any> {
    email.emailTo = email.emailTo.trim();
    return this.httpClient.post<any>(environment.BACKEND_BASE_URL + 'email-password/send', email);
  }

  public resetPassword(resetPassword: ResetPassword): Observable<any> {
    resetPassword.newPassword = resetPassword.newPassword.trim();
    resetPassword.confirmPassword = resetPassword.confirmPassword.trim();
    return this.httpClient.post<any>(environment.BACKEND_BASE_URL + 'email-password/reset', resetPassword);
  }
}
