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

  constructor(private httpClient: HttpClient) { }

  public getArticle(articleId: Number): Observable<Article> {
    return this.httpClient.get<Article>(ARTICLE_BASE_URL + articleId);
  }

  public getArticles(username: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(ARTICLE_BASE_URL + 'list/' + username);
  }

  public createArticle(post: Article, username: string): Observable<any> {
    return this.httpClient.post<any>(ARTICLE_BASE_URL + 'create/' + username, post);
  }

  public updateArticle(articleId: number, article: Article): Observable<any>{
    return this.httpClient.put<any>(ARTICLE_BASE_URL + 'update/' + articleId, article);
  }

  public deleteArticle(articleId: Number): Observable<any>{
    return this.httpClient.delete<any>(ARTICLE_BASE_URL + 'delete/' + articleId);
  }

  public uploadImage(img: File): Observable<any>{
    const formData = new FormData();
    formData.append('multipartFile', img);
    return this.httpClient.post<any>(ARTICLE_BASE_URL + 'image/upload', formData);
  }

  public getImagesByArticleId(articleId: number): Observable<any> {
    return this.httpClient.get<any>(ARTICLE_BASE_URL + 'image/list/' + articleId);
  }
  
}
