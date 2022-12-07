import { Weather } from './../../shared/models/weather';
import { ApiWeatherService } from './../../shared/services/apiWeather.service';
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';
import { TokenService } from 'src/app/shared/services/token.service';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  post!: Article | undefined;
  idPost!: number;
  temp!: number;

  constructor(
    private apiWeatherService: ApiWeatherService,
    private readonly route: ActivatedRoute,
    private articleSvc: ArticleService,
    public tokenSvc: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idPost = this.route.snapshot.params['id'];
    this.getArticleById(this.idPost);
  }

  // Store data in a article service variable
  onGoToMap() {
    this.articleSvc.data = this.post;
    this.articleSvc.focusArticleOnMap = true;
    this.router.navigate(['home']);
  }

  private getArticleById(id: number) {
    this.articleSvc.getArticle(id).subscribe(
      data => {
        this.post = data,
        this.getWeather(this.post.latitude, this.post.longitude);
      });
  }

  private getWeather(lat: number, lon: number) {
    this.apiWeatherService.getWeather(lat, lon).subscribe((data: Weather) => {
      this.temp = Math.round(data.main.temp);
    })
  };

  onEdit(post: any) {
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  }
}
