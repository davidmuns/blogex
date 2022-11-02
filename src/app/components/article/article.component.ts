import { WeatherService } from './../../shared/services/weather.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  post!: Article | undefined;
  idPost!: number;
  tiempo: any;
 

  constructor(
    private weatherService: WeatherService,
    private readonly route: ActivatedRoute,
    private articleSvc: ArticleService,
  ) { }

  ngOnInit(): void {
    this.idPost = this.route.snapshot.params['id'];
    this.getArticleById(this.idPost);
    
  }

  private getArticleById(id: number) {
    this.articleSvc.getArticle(id)
      .subscribe({
        next: data => {
          this.post = data;
          this.getWeather(this.post?.latitude, this.post?.longitude);
        },
        error: err => {
          console.log(err);
          
        }
      })
  }

  private getWeather(lat: number | undefined, lon: number | undefined) {
    const apiKey = 'd0047952dfbeb9ec30622425fe11ed84';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`)
      .then(resp => resp.json())
      .then(
        data => {
          this.tiempo = data;
        }
      )
  }

}