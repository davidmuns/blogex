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

  public getArticle(articleId: Number): Observable<Article> {
    return this.HttpClient.get<Article>(ARTICLE_BASE_URL + articleId);
  }

  public getAllByUserName(username: string): Observable<Article[]> {
    return this.HttpClient.get<Article[]>(ARTICLE_BASE_URL + 'list/' + username);
  }

  public getAll(): Observable<Article[]> {
    return this.HttpClient.get<Article[]>(ARTICLE_BASE_URL + 'list');
  }

  public createArticle(post: Article, username: string): Observable<any> {
    return this.HttpClient.post<any>(ARTICLE_BASE_URL + 'create/' + username, post);
  }

  public update(articleId: number, article: Article): Observable<any>{
    return this.HttpClient.put<any>(ARTICLE_BASE_URL + 'update/' + articleId, article);
  }

  public delete(articleId: Number): Observable<any>{
    return this.HttpClient.delete<any>(ARTICLE_BASE_URL + 'delete/' + articleId);
  }

  public getArticles(): Observable<Article[]>{
    return this.HttpClient.get<Article[]>(environment.ARTICLES_LOCAL);
  }
  
}
