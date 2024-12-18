import { Article } from './../../../shared/models/article';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/shared/services/token.service';
import { LoginComponent } from '../../auth/login/login.component';
import { Imagen } from 'src/app/shared/models/imagen';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;
  carouselPositionTop = false;
  isModalOpen: boolean = false;
  indice: number = 0;

  imgs: Imagen[]  = [
    { id: '', caption: 'Barcelona', url: 'https://res.cloudinary.com/dwfwp0eyg/image/upload/v1734313270/yrsmcoht8tivqmmugzud.jpg', fileType: 'image', date: '' },
    { id: '', caption: 'Maldivas', url: 'https://res.cloudinary.com/dwfwp0eyg/image/upload/v1734317610/fnqzqbmpipspugesi9ji.jpg', fileType: 'image', date: '' },
    // { id: '', name: 'acantilados', url: '../../../../assets/img/acantilados.jpg', fileType: 'image', date: '' },
    { id: '', caption: 'Omis - Croacia', url: 'https://res.cloudinary.com/dwfwp0eyg/image/upload/v1734315029/r9yowpi2s6dftaz5q2cx.jpg', fileType: 'image', date: '' },
    { id: '', caption: 'Paris', url: 'https://res.cloudinary.com/dwfwp0eyg/image/upload/v1733933056/qnbvj2jyai2emosmg4wk.jpg', fileType: 'image', date: '' },
    
  ]

  constructor(private readonly dialog: MatDialog,
    public tokenSvc: TokenService) { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      enterAnimationDuration: '1000ms'
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if (this.getScreenWidth < 700) {
      this.carouselPositionTop = true;
    } else {
      this.carouselPositionTop = false;
    }
  }

  openModal(indice: number) {
    this.indice = indice;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}
