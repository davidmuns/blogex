import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public hide: boolean = true;
  public signupForm!: FormGroup;

  constructor(
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    public authSvc: AuthService,
    private translateService: TranslateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.signupForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  signupOpen() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent);
  }

  newUser(user: User) {
    if (this.signupForm.valid) {
      this.authSvc.signupUser(user).subscribe({
        next: (data) => {
          this.toastr.success(data.mensaje, '', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.dialog.closeAll();
          this.dialog.open(LoginComponent);
        },

        error: err => {
          let msg = '';
          if(err.error.mensaje.includes('Email')){
            msg = this.translateService.instant('auth.signup.email-exists');
          } else {
            msg = this.translateService.instant('auth.signup.username-exists');
          }
          this.toastr.error(msg, '', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      });
    } else {
      this.toastr.error(this.translateService.instant('auth.signup.fill-blanks'), '', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
  }

}
