import { TokenService } from './../services/token.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public validation: boolean = false;

  constructor(
    public dialog: MatDialog,
    public tokenService: TokenService
  ) {

  }

  ngOnInit(): void {
    
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }
  signupDialog() {
    this.dialog.open(SignupComponent);
  }

  onLogout(){
    this.tokenService.logOut();
  }

}