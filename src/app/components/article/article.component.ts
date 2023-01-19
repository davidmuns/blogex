import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiWeatherService } from './../../shared/services/apiWeather.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  backgroundColor = '#757573';
  post!: Article;
  idPost!: number;
  temp!: number;
  
  constructor(
    public sanitizer: DomSanitizer,
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

  // https://www.youtube.com/watch?v=vpq2FxNzgd4
  private getWeather(lat: number, lon: number) {
    this.apiWeatherService.getWeather(lat, lon)
      .then(resp => resp.json())
      .then(data => {
        this.temp = parseInt(data.main.temp);
      });
  };

  onEdit(post: any) {
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  }
}
