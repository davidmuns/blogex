import { ArticleService } from 'src/app/shared/services/article.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './../../shared/services/utils.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import AOS from 'aos';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.scss']
})
export class UserBlogComponent implements OnInit {
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
  username!: string;
  public articles: Article[] = []
  public pageSizeOptions: number[] = [2, 4, 8, 10];
  public pageSize: number = 4;
  public pageNumber: number = 1;
  temp!: number;
  isAdmin: boolean = false;

  constructor(
    private utilsSvc: UtilsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly articleSvc: ArticleService,
    private router: Router,
    public tokenSvc: TokenService,
    private translateSvc: TranslateService
  ) { }

  ngOnInit(): void {
    AOS.init();
    this.username = this.tokenSvc.getUsername() as string;
    this.isAdmin = this.tokenSvc.isAdmin();
    if (this.isAdmin) {
      this.getAllArticles();
    } else {
      this.getAllArticlesByUsername();
    };
  };

  private getAllArticlesByUsername() {
    // https://youtu.be/nC-do8ceLWY?list=PL4vWncexIMYvaYdepQvyryGBhIHU-Sd04&t=313
    this.activatedRoute.paramMap.subscribe(resp => {
      if (resp.get('username') !== null) {
        this.username = resp.get('username') as string;
      }
    });
    this.articleSvc.getArticlesByUsername(this.username).subscribe(
      (data: Article[]) => {
        this.articles = this.utilsSvc.sortArticlesBy(data, this.sortBy);
      }
    )
  }

  private getAllArticles() {
    this.articleSvc.getAll().subscribe({
      next: (data: Article[]) => {
        this.articles = this.utilsSvc.sortArticlesBy(data, this.sortBy);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onEdit(post: any) {
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
  }

  onSortBy() {
    if (this.isAdmin) {
      this.getAllArticles();
    } else {
      this.getAllArticlesByUsername();
    };
  };
};
