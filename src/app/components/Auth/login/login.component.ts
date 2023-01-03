import { TranslateService } from '@ngx-translate/core';
import { EmailPasswordComponent } from '../email-password/email-password.component';
import { Router } from '@angular/router';
import { Login } from '../../../shared/models/login';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    private authSvc: AuthService,
    private tokenService: TokenService,
    private readonly router: Router,
    private translateService: TranslateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.loginForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signupOpen() {
    this.dialog.closeAll();
    this.dialog.open(SignupComponent);
  }

  emailOpen() {
    this.dialog.closeAll();
    this.dialog.open(EmailPasswordComponent);
  }

  onSubmit(login: Login) {
    if (this.loginForm.valid) {
      this.authSvc.loginUser(login).subscribe({
        next: data => {
          this.tokenService.setToken(data.token);
          this.toastr.success(`Welcome again ${login.nombreUsuario}!`, '', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.dialog.closeAll();
          this.router.navigate(['admin/new']);
        },
        error: err => {
          this.toastr.error(this.translateService.instant('auth.login.wrong-data'), '', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.loginForm.reset();
        }
      });
    } else {
      this.toastr.error(this.translateService.instant('auth.login.fill-blanks'), '', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
  }
}
