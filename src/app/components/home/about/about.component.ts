import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/shared/services/token.service';
import { LoginComponent } from '../../Auth/login/login.component';
import { SignupComponent } from '../../Auth/signup/signup.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
    public tokenSvc: TokenService) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(LoginComponent)
  }

  signupDialog(){
    this.dialog.open(SignupComponent)
  }

}
