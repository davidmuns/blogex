import { Article } from './../../../shared/models/article';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/shared/services/token.service';
import { LoginComponent } from '../../auth/login/login.component';
import { Imagen } from 'src/app/shared/models/imagen';
import { ArticleService } from 'src/app/shared/services/article.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

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
  article!: Article;
  imagenes: Imagen[] = [];

  imgs: Imagen[]  = [
    { id: '', caption: 'Barcelona', url: '../../../../assets/img/hotel-vela.jpg', fileType: 'image', date: '' },
    { id: '', caption: 'Maldivas', url: '../../../../assets/img/maldivas.jpg', fileType: 'image', date: '' },
    { id: '', caption: 'Besalú - Girona', url: '../../../../assets/img/besalu.jpg', fileType: 'image', date: '' },
    { id: '', caption: 'Omis - Croacia', url: '../../../../assets/img/omis.jpg', fileType: 'image', date: '' },
    { id: '', caption: 'Paris', url: '../../../../assets/img/paris.jpg', fileType: 'image', date: '' },
    
  ]

  constructor(
    private readonly articleSvc: ArticleService,
    private readonly dialog: MatDialog,
    public tokenSvc: TokenService,
    private readonly utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getArticleById(463)
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

  private getArticleById(id: number) {
    
    this.articleSvc.getArticle(id).subscribe({
      next: data => {
        this.imagenes = data.imagenes;
      
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    });
  }

  openModal(indice: number) {
    this.indice = indice;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}
