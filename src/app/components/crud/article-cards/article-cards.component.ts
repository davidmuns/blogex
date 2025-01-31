// Services
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
import { Router } from '@angular/router';
// Components
import { GalleryImagesComponent } from './gallery-images/gallery-images.component';
import { GalleryVideosComponent } from './gallery-videos/gallery-videos.component';
// Animate on scroll library => https://michalsnik.github.io/aos/
import AOS from 'aos';
import { EditComponent } from '../posts/edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-article-cards',
  templateUrl: './article-cards.component.html',
  styleUrls: ['./article-cards.component.scss']
})
export class ArtcileCardsComponent implements OnInit {

  sortBy = '';
  filterByTitle = '';
  articles: Article[] = [];
  imagenes: Imagen[] = [];
  imgsByArticleId: Imagen[] = [];
  image!: File;
  miniatura!: Imagen;
  username!: string;
  articleId!: number;
  pageSizeOptions: number[] = [4, 8, 16, 20, 24];
  pageSize: number = 8;
  pageNumber: number = 1;
  isAdmin: boolean = false;
  sort: boolean = false;
  loading = false;

  constructor(
    private readonly utilsSvc: UtilsService,
    private readonly dialog: MatDialog,
    private readonly tokenService: TokenService,
    private readonly articleService: ArticleService,
    private readonly router: Router) { };

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
    this.loading = true;
    this.articleService.getAll().subscribe({
      next: (data: Article[]) => {
        this.articles = this.utilsSvc.sortArticlesBy(data, this.sortBy);
        this.loading = false;
      },
      error: (err: any) => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    });
  };

  private getAllArticlesByUsername() {
    this.loading = true;
    this.articleService.getArticlesByUsername(this.username).subscribe({
      next: (data: Article[]) => {
        this.articles = this.utilsSvc.sortArticlesBy(data, this.sortBy);
        this.loading = false;
      },
      error: (err: any) => {
        this.utilsSvc.showSnackBar(err.error.message, 3000);
      }
    });
  };

  onOpenVideosGallery(a: Article) {
    this.dialog.open(GalleryVideosComponent, {
      data: { article: a },
      exitAnimationDuration: '500ms'
    });
  };

  onOpenImagesGallery(a: Article) {
    this.dialog.open(GalleryImagesComponent, {
      data: { article: a, from: 'article-cards-app' },
      exitAnimationDuration: '500ms'
    });
  };

  onEdit(post: Article) {
    this.dialog.open(EditComponent, {
      data: { article: post },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
    // this.navigationExtras.state = post;
    // this.router.navigate(['admin/edit'], this.navigationExtras);
  };

  onDelete(a: Article) {
    this.dialog.open(DeleteComponent, {
      data: { article: a, option: "deleteArticle" },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  }

  onSortBy(optionSelected: string) {
    this.sortBy = optionSelected;
    if (this.isAdmin) {
      this.getAllArticles();
    } else {
      this.getAllArticlesByUsername();
    };
  }
};
