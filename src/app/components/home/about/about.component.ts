import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/shared/services/token.service';
import { LoginComponent } from '../../auth/login/login.component';

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
    this.dialog.open(LoginComponent, {
      enterAnimationDuration: '1000ms'
    });
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
