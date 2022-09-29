import { Router } from '@angular/router';
import { Login } from './../../shared/models/login';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide:boolean = true;

  constructor(
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    public authSvc: AuthService,
    private readonly router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.initform();
  }

  private initform():void{
    this.loginForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signupOpen(){
    this.dialog.closeAll();
    this.dialog.open(SignupComponent);
  }

  loginUser(login: Login){
    console.log(login);
    this.authSvc.loginUser(login).subscribe({
      next: data => {
        this.toastr.success(`Welcome again ${login.nombreUsuario}!`, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },

      error: err => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }


    });

    
  }

}
