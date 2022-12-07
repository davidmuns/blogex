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

  @Output() eventEmitter = new EventEmitter<Article>(); 
  post!: Article | undefined;
  idPost!: number;
  temp!: any;

  constructor(
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
        this.getWeather(data.latitude, data.longitude);
      });
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

  onEdit(post: any){
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  }
}
