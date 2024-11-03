import { UtilsService } from './../../../shared/services/utils.service';
import { EmailPasswordComponent } from 'src/app/components/auth/email-password/email-password.component';
import { User } from 'src/app/shared/models/user';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Login } from '../../../shared/models/login';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private utilsSvc: UtilsService,
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    private authSvc: AuthService,
    private tokenService: TokenService,
    private readonly router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.loginForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signupForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]]
    });
  }


  signupOpen() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      enterAnimationDuration: '1000ms'
    });
  }

  emailOpen() {
    this.dialog.closeAll();
    this.dialog.open(EmailPasswordComponent, {
      enterAnimationDuration: '1000ms'
    })
  }

  onLogin(login: Login) {
    if (this.loginForm.valid) {
      this.authSvc.loginUser(login).subscribe({
        next: data => {
          this.tokenService.setToken(data.token);
          this.dialog.closeAll();
          const msg = `${this.translateService.instant('auth.login.welcome')} ${login.nombreUsuario}!`;
          this.utilsSvc.showSnackBar(msg, 5000);
          this.router.navigate(['admin/new']);
        },
        error: err => {
          const msg = this.translateService.instant('auth.login.wrong-data');
          this.utilsSvc.showSnackBar(msg, 10000);
          this.loginForm.reset();
        }
      });
    } else {
      const msg = this.translateService.instant('auth.login.fill-blanks');
      this.utilsSvc.showSnackBar(msg, 5000);
    };
  };

  onSignup(user: User) {
    let msg = '';
    if (this.signupForm.valid) {
      this.authSvc.signupUser(user).subscribe({
        next: (data) => {
          this.dialog.closeAll();
          this.dialog.open(LoginComponent);
          msg = this.translateService.instant('auth.login.user-saved');
          this.utilsSvc.showSnackBar(msg, 10000);
        },
        error: err => {
          if (err.error.mensaje.includes('Email')) {
            msg = this.translateService.instant('auth.signup.email-exists');
          } else {
            msg = this.translateService.instant('auth.signup.username-exists');
          }
          this.utilsSvc.showSnackBar(msg, 3000);
        }
      });
    } else {
      const msg = this.translateService.instant('auth.signup.fill-blanks');
      this.utilsSvc.showSnackBar(msg, 3000);
    };
  };
};
