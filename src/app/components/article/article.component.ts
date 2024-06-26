import { UtilsService } from './../../shared/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
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
  post!: Article | undefined;
  idPost!: number;
  temp!: number;
  username!: string;
  iconUrl: string = ''; 

  constructor(
    private utilsSvc: UtilsService,
    private translateService: TranslateService,
    public sanitizer: DomSanitizer,
    private apiWeatherService: ApiWeatherService,
    private readonly route: ActivatedRoute,
    private articleSvc: ArticleService,
    public tokenSvc: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(resp => {
      if (resp.get('id') !== null) {
        this.idPost = parseInt(resp.get('id') as string);
      }
    })
    this.getArticleById(this.idPost);
  }

  // Store data in a article service variable
  onGoToMap() {
    this.articleSvc.data = this.post;
    this.articleSvc.focusArticleOnMap = true;
    this.router.navigate(['home']);
  }

  private getArticleById(id: number) {
    this.articleSvc.getArticle(id).subscribe({
      next: data => {
        this.post = data;
        this.username = data.usuario.nombreUsuario;
        this.getWeather(this.post.latitude, this.post.longitude);
      },
      error: err => {
        const msg = this.translateService.instant('article.exist');
        this.router.navigate(['']);
        this.utilsSvc.showSnackBar(msg, 5000);
      }
    });
  }

  // https://www.youtube.com/watch?v=vpq2FxNzgd4
  private async getWeather(lat: number, lon: number) {
     await this.apiWeatherService.getWeather(lat, lon)
      .then(resp => resp.json())
      .then(data => {
        const iconCode = data.weather[0].icon;
        this.iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
        this.temp = parseInt(data.main.temp);
      });
  };

  onEdit(post: any) {
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  }
}


