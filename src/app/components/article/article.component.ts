import { UtilsService } from './../../shared/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiWeatherService } from './../../shared/services/apiWeather.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditComponent } from '../crud/posts/edit/edit.component';
import { bounce, fadeIn, fadeInZoom, fadeSlide, pulse, rotate, scaleUp, slideIn, zoomInOut } from './../../shared/models/animations';
// Animate on scroll library => https://michalsnik.github.io/aos/
import AOS from 'aos';
import { Overlay } from '@angular/cdk/overlay';
import { environment } from 'src/environments/environment';
// const dialogConfig = environment.dialogConfig;
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    fadeInZoom,
    fadeIn,
    slideIn,
    slideIn,
    zoomInOut,
    rotate,
    scaleUp,
    bounce,
    pulse,
    fadeSlide
  ]
})
export class ArticleComponent implements OnInit {

  post!: Article | undefined;
  idPost!: number;
  temp!: number;
  username!: string;
  iconUrl: string = '';
  loading = false;

  constructor(
    private readonly utilsSvc: UtilsService,
    private readonly translateService: TranslateService,
    private readonly apiWeatherService: ApiWeatherService,
    private readonly route: ActivatedRoute,
    private readonly articleSvc: ArticleService,
    public tokenSvc: TokenService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(resp => {
      AOS.init();
      if (resp.get('id') !== null) {
        this.idPost = parseInt(resp.get('id') as string);
      }
    })
    this.getArticleById(this.idPost);
  }

  // Store data in a article service variable
  onGoToMap() {
    this.articleSvc.setArticleSubject(this.post);
    this.router.navigate(['home']);
  }

  private getArticleById(id: number) {
    this.loading = true;
    this.articleSvc.getArticle(id).subscribe({
      next: data => {
        this.post = data;
        this.username = data.usuario.nombreUsuario;
        this.getWeather(this.post.latitude, this.post.longitude);
        this.loading = false;
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = false;
    dialogConfig.enterAnimationDuration = '500ms';
    dialogConfig.exitAnimationDuration = '500ms'
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop(); // Permite el scroll en el fondo.
    dialogConfig.data = { article: post };
    this.dialog.open(EditComponent, dialogConfig);
  }
}


