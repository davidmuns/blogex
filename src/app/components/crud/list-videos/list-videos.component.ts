// Services
import { TranslateService } from '@ngx-translate/core';
import { ArticleService } from './../../../shared/services/article.service';
import { UtilsService } from './../../../shared/services/utils.service';
import { TokenService } from 'src/app/shared/services/token.service';
// Material
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
// Models
import { Imagen } from './../../../shared/models/imagen';
import { Article } from './../../../shared/models/article';
// Angular
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// Components 
import { GalleryVideosComponent } from './gallery-videos/gallery-videos.component';


@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss']
})
export class ListVideosComponent implements OnInit {
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

  constructor(
    private translateSvc: TranslateService,
    private utilsSvc: UtilsService,
    private readonly dialog: MatDialog,
    private tokenService: TokenService,
    private articleService: ArticleService,
    private router: Router) { };

  ngOnInit(): void {
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
        console.log(err);
      }
    });
  };

  private getAllArticlesByUsername() {
    this.articleService.getArticlesByUsername(this.username).subscribe({
      next: (data: Article[]) => {
        this.articles = this.utilsSvc.sortArticlesBy(data, this.sortBy);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  };

  onOpenGallery(a: Article) {
    this.dialog.open(GalleryVideosComponent, { data: { article: a } });
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
}
