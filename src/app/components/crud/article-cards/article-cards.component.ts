// Services
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../../shared/services/utils.service';
import { ArticleService } from '../../../shared/services/article.service';
import { TokenService } from '../../../shared/services/token.service';
// Material
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
// Models
import { Article } from '../../../shared/models/article';
import { Imagen } from 'src/app/shared/models/imagen';
// Angular
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// Components 
import { GalleryImagesComponent } from './gallery-images/gallery-images.component';
import { GalleryVideosComponent } from './gallery-videos/gallery-videos.component';
// Animate on scroll library => https://michalsnik.github.io/aos/
import AOS from 'aos';


@Component({
  selector: 'app-article-cards',
  templateUrl: './article-cards.component.html',
  styleUrls: ['./article-cards.component.scss']
})
export class ArtcileCardsComponent implements OnInit {
  sortBy = '';
  orderOptions = [
    { value: 'title', viewValue: this.translateSvc.instant('user-blog.title') },
    { value: 'date', viewValue: this.translateSvc.instant('user-blog.date') },
  ];
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
  public pageSizeOptions: number[] = [2, 4, 8, 10];
  public pageSize: number = 4;
  public pageNumber: number = 1;
  isAdmin: boolean = false;
  sort: boolean = false;

  constructor(
    private translateSvc: TranslateService,
    private utilsSvc: UtilsService,
    private readonly dialog: MatDialog,
    private tokenService: TokenService,
    private articleService: ArticleService,
    private router: Router) { };

  ngOnInit(): void {
    AOS.init();
    this.username = this.tokenService.getUsername() as string;
    this.isAdmin = this.tokenService.isAdmin();
    if (this.isAdmin) {
      this.getAllArticles();
    } else {
      this.getAllArticlesByUsername();
    }
    this.articles = [];
  };

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
  };

  private getAllArticles() {
    this.articleService.getAll().subscribe({
      next: (data: Article[]) => {
        this.articles = this.utilsSvc.sortArticlesBy(data, this.sortBy);
      },
      error: (err: any) => {
       this.utilsSvc.showSnackBar(err.error.message, 3000);
      }
    });
  };

  private getAllArticlesByUsername() {
    this.articleService.getArticlesByUsername(this.username).subscribe({
      next: (data: Article[]) => {
        this.articles = this.utilsSvc.sortArticlesBy(data, this.sortBy);
      },
      error: (err: any) => {
        this.utilsSvc.showSnackBar(err.error.message, 3000);
      }
    });
  };

  onOpenVideosGallery(a: Article) {
    this.dialog.open(GalleryVideosComponent, { data: { article: a } });
  };

  onOpenImagesGallery(a: Article) {
    this.dialog.open(GalleryImagesComponent, { data: { article: a } });
  };

  onEdit(post: Article) {
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  };

  onSortBy() {
    if (this.isAdmin) {
      this.getAllArticles();
    } else {
      this.getAllArticlesByUsername();
    };
  }
};
