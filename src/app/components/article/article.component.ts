import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public articles: Article[] = [];

  constructor(private readonly http: HttpClient, private articleSvc: ArticleService) {
    this.getArticles();
   }

  ngOnInit(): void {
  }

    //In case of assets file is a JSON format
   private async getArticles(){
    this.articleSvc.getArticles()
      .subscribe(res => {
        this.articles = res;
      })
  }
 
}
