import { GalleryImagesComponent } from './gallery-images/gallery-images.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ArticleService } from '../../../shared/services/article.service';
import { TokenService } from '../../../shared/services/token.service';
import { Article } from '../../../shared/models/article';
import { Imagen } from 'src/app/shared/models/imagen';


@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss']
})
export class ListImagesComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };
  filterByTitle = '';
  articles: Article[] = [];
  imagenes: Imagen[] = [];
  imgsByArticleId: Imagen[] = [];
  image!: File;
  miniatura!: Imagen;
  username!: string;
  articleId!: number;
  public pageSizeOptions: number[] = [1, 3, 5, 9];
  public pageSize: number = 1;
  public pageNumber: number = 1;
  isAdmin: boolean = false;

  constructor(
    private readonly dialog: MatDialog,
    private tokenService: TokenService,
    private articleService: ArticleService,
    private router: Router) {};

  ngOnInit(): void { 
    this.username = this.tokenService.getUsername() as string;
    this.isAdmin =this.tokenService.isAdmin();
      if(this.isAdmin){
        this.getAllArticles();
      }else{
        this.getAllArticlesByUsername();
      }
    this.articles = [];
  };

  onPageChange(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex +1;
  };

  private getAllArticles(){
    this.articleService.getAll().subscribe({
      next: (data: Article[]) => {
        this.articles = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  };

  private getAllArticlesByUsername() {
    this.articleService.getArticlesByUsername(this.username).subscribe({
      next: (data: Article[]) => {
        this.articles = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  };

  onOpenGallery(a: Article) {
    this.dialog.open(GalleryImagesComponent, { data: { article: a } });
  };

  onEdit(post: Article){
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  };
};
