import { Component, HostListener, OnInit } from '@angular/core';
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

  public getScreenWidth: any;
  public getScreenHeight: any;
  carouselPositionTop = false;

  constructor(private readonly dialog: MatDialog,
    public tokenSvc: TokenService) { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  openDialog(){
    this.dialog.open(LoginComponent)
  }

  signupDialog(){
    this.dialog.open(SignupComponent)
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if(this.getScreenWidth < 749){
      this.carouselPositionTop = true;
    }else{
      this.carouselPositionTop = false;
    }
  }

}
