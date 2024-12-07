import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailPasswordComponent } from 'src/app/components/auth/email-password/email-password.component';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/auth/login/login.component';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {
  @Input() formType: string = '';
  protected form!: FormGroup;
  protected hide: boolean = true;

  constructor(
    private readonly translateSvc: TranslateService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly authSvc: AuthService,
    private readonly tokenSvc: TokenService,
    private readonly utilsSvc: UtilsService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    if (this.formType === 'login') {
      this.initFormLogin();
    } else if (this.formType === 'signup') {
      this.initFormSignup();
    } else {
      alert("option: " + this.formType + 'does not exist')
    }
  }

  private initFormLogin() {
    this.form = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', Validators.required]
    });
  }

  private initFormSignup() {
    this.form = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]]
    });
  }

  onSubmit() {
    switch (this.formType) {
      case 'login': {
        this.login();
        break;
      }
      case 'signup': {
        this.signup();
        break;
      }
      default: {
        alert("form type: " + this.formType + ' does not exist')
        break;
      }
    }
  }

  private login() {
    if (this.form.valid) {
      this.authSvc.loginUser(this.form.value).subscribe({
        next: data => {
          this.tokenSvc.setToken(data.token);
          this.dialog.closeAll();
          const msg = `${this.translateSvc.instant('auth.login.welcome')} ${this.form.value.nombreUsuario}!`;
          this.utilsSvc.showSnackBar(msg, 5000);
          this.router.navigate(['group-form']);
        },
        error: err => {
          const msg = this.translateSvc.instant('auth.login.wrong-data');
          this.utilsSvc.showSnackBar(msg, 10000);
          this.form.reset();
        }
      });
    } else {
      const msg = this.translateSvc.instant('auth.login.fill-blanks');
      this.utilsSvc.showSnackBar(msg, 5000);
    };
  }

  private signup() {
    let msg = '';
    if (this.form.valid) {
      this.authSvc.signupUser(this.form.value).subscribe({
        next: (data) => {
          this.dialog.closeAll();
          this.dialog.open(LoginComponent);
          msg = this.translateSvc.instant('auth.login.user-saved');
          this.utilsSvc.showSnackBar(msg, 10000);
        },
        error: err => {
          if (err.error.mensaje.includes('Email')) {
            msg = this.translateSvc.instant('auth.signup.email-exists');
          } else {
            msg = this.translateSvc.instant('auth.signup.username-exists');
          }
          this.utilsSvc.showSnackBar(err.error.mensaje, 3000);
        }
      });
    } else {
      const msg = this.translateSvc.instant('auth.signup.fill-blanks');
      this.utilsSvc.showSnackBar(msg, 3000);
    };
  }

  emailOpen() {
    this.dialog.closeAll();
    this.dialog.open(EmailPasswordComponent, {
      enterAnimationDuration: '1000ms'
    })
  }

  signupOpen() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      enterAnimationDuration: '1000ms'
    });
  }
}
