import { ArticleService } from 'src/app/shared/services/article.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './../../shared/services/utils.service';
import { ApiWeatherService } from '../../shared/services/apiWeather.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';

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
    private apiWeatherService: ApiWeatherService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly articleSvc: ArticleService,
    private router: Router,
    public tokenSvc: TokenService,
    private translateSvc: TranslateService
  ) { }

  ngOnInit(): void {
    this.username = this.tokenSvc.getUsername() as string;
    this.isAdmin = this.tokenSvc.isAdmin();
    if (this.isAdmin) {
      this.getAllArticles();
    } else {
      this.getAllArticlesByUsername();
    };
  };

  private getAllArticlesByUsername() {
    this.activatedRoute.paramMap.subscribe(resp => {
      if (resp.get('username') !== null) {
        this.username = resp.get('username') as string;
      }
    })
    // this.username = this.activatedRoute.snapshot.paramMap.get('username') as string;
    this.articleSvc.getArticlesByUsername(this.username).subscribe(
      (data: Article[]) => {
        if(this.sortBy === 'title')
          this.articles = this.utilsSvc.sortArticlesAlphabeticallyByTitle(data);
        else if(this.sortBy === 'date'){
          this.articles = this.utilsSvc.sortArticlesById(data);
        }else{
          this.articles = data;
        }
        if (this.articles.length > 0) {
          let lon = this.articles[this.pageNumber - 1].longitude;
          let lat = this.articles[this.pageNumber - 1].latitude;
          this.getWeather(lat, lon);
        }
      }
    )
  }

  private getAllArticles() {
    this.articleSvc.getAll().subscribe({
      next: (data: Article[]) => {
        this.articles = data;
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
    let lon = this.articles[this.pageNumber - 1].longitude;
    let lat = this.articles[this.pageNumber - 1].latitude;
    this.getWeather(lat, lon);
  }

  // https://www.youtube.com/watch?v=vpq2FxNzgd4
  private getWeather(lat: number, lon: number) {
    this.apiWeatherService.getWeather(lat, lon)
      .then(resp => resp.json())
      .then(data => {
        this.temp = parseInt(data.main.temp);
      });
  };

  // Store data in a article service variable
  onGoToMap(article: Article) {
    this.articleSvc.data = article;
    this.articleSvc.focusArticleOnMap = true;
    this.router.navigate(['home']);
  }

  onSortBy(){
    this.getAllArticlesByUsername();
  }
}
