import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;

  constructor(public readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  signupOpen(){
    this.dialog.closeAll();
    this.dialog.open(SignupComponent);
  }

  loginUser(){
    
  }

}
