import { LoginComponent } from 'src/app/components/Auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/shared/services/token.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  private username!: string;
  public articles: Article[] = []
  public pageSizeOptions: number[] = [1];
  public pageSize: number = 1;
  public pageNumber: number = 1;
  temp!: number;

  constructor(
    public dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly articleSvc: ArticleService,
    public tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getAllArticlesByUsername();
  }

  private getAllArticlesByUsername() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username') as string;
    this.articleSvc.getArticlesByUsername(this.username).subscribe(
      (data: Article[]) => {
        this.articles = data
        if (this.articles.length > 0) {
          let lon = this.articles[this.pageNumber - 1].longitude;
          let lat = this.articles[this.pageNumber - 1].latitude;
          this.getWeather(lat, lon);
        }
      }
    )
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    let lon = this.articles[this.pageNumber - 1].longitude;
    let lat = this.articles[this.pageNumber - 1].latitude;
    this.getWeather(lat, lon);
  }

  // https://www.youtube.com/watch?v=vpq2FxNzgd4
  private getWeather(lat: number | undefined, lon: number | undefined) {
    const apiKey = 'd0047952dfbeb9ec30622425fe11ed84';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`)
      .then(resp => resp.json())
      .then(
        data => {
          this.temp = parseInt(data.main.temp);
        }
      )
  }
}
