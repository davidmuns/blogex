import { Router } from '@angular/router';
import { Login } from './../../shared/models/login';
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

  loginUser(login: Login) {
    this.authSvc.loginUser(login).subscribe({
      next: data => {
        this.tokenService.setToken(data.token);
        this.toastr.success(`Welcome again ${login.nombreUsuario}!`, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.dialog.closeAll();
      },
      error: err => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    });
  }
}
