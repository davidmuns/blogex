import { Article } from './../models/article';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ARTICLE_BASE_URL = environment.ARTICLE_BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private HttpClient: HttpClient) { }

  public createArticle(post: Article, username: string): Observable<any> {
    return this.HttpClient.post<any>(ARTICLE_BASE_URL + 'create/' + username, post);
  }

  public getAll(username: string): Observable<Article[]> {
    return this.HttpClient.get<Article[]>(ARTICLE_BASE_URL + 'list/' + username);
  }
}
