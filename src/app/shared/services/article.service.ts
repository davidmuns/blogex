import { Injectable } from '@angular/core';
import articlesJson from '../../../assets/articles.json';
import { IArticle } from './../models/iarticle';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // https://fjmduran.com/blog/leer-json-angular
  private articles: IArticle[];

  constructor(private httpClient: HttpClient) {
    this.articles = articlesJson;
  }
  public getAll(): Observable<IArticle[]> {
    return this.httpClient.get<IArticle[]>("../../../assets/articles.json");
  }

}
