import { UtilsService } from './../../../shared/services/utils.service';
import { GalleryVideosComponent } from './gallery-videos/gallery-videos.component';
import { PageEvent } from '@angular/material/paginator';
import { ArticleService } from './../../../shared/services/article.service';
import { MatDialog } from '@angular/material/dialog';
import { Imagen } from './../../../shared/models/imagen';
import { Article } from './../../../shared/models/article';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss']
})
export class ListVideosComponent implements OnInit {

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
        this.articles = this.utilsSvc.sortArticlesAlphabeticallyByTitle(data);
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

}
