import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article';
import { ArticleJson } from 'src/assets/articles';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public articles: Article[] = [];

  constructor(private readonly http: HttpClient) {
    //this.getArticles();
    this.articles = ArticleJson;
   }

  ngOnInit(): void {
  }

    //In case of assets file is a JSON format
  /* private async getArticles(){
    this.http.get<Article[]>('./../../../assets/articles.ts')
      .subscribe(res => {
        this.articles = res;
      })
  }
 */
}
