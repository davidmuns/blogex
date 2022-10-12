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

  public getAll(username: string): Observable<Article[]> {
    return this.HttpClient.get<Article[]>(ARTICLE_BASE_URL + 'list/' + username);
  }

  public createArticle(post: Article, username: string): Observable<any> {
    return this.HttpClient.post<any>(ARTICLE_BASE_URL + 'create/' + username, post);
  }

  public updateArticle(articleId: number, article: Article): Observable<any>{
    return this.HttpClient.put<any>(ARTICLE_BASE_URL + 'update/' + articleId, article);
  }

  public deleteArticle(articleId: Number): Observable<any>{
    return this.HttpClient.delete<any>(ARTICLE_BASE_URL + 'delete/' + articleId);
  }

  public uploadImage(img: File): Observable<any>{
    const formData = new FormData();
    formData.append('multipartFile', img);
    return this.HttpClient.post<any>(ARTICLE_BASE_URL + 'image/upload', formData);
  }

  public deleteImg(id: number): Observable<any>{
    return this.HttpClient.delete<any>('http://localhost:8080/cloudinary/delete/' + id);
  }
  
}
