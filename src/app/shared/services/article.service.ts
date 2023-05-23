import { Article } from './../models/article';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  data!: Article | undefined;
  focusArticleOnMap: boolean = false;
  public fadeInOut: boolean = true;

  constructor(private httpClient: HttpClient) { }

  public getArticle(articleId: number): Observable<Article> {
    return this.httpClient.get<Article>(environment.BACKEND_BASE_URL + 'article/one/' + articleId);
  }

  public getArticlesByUsername(username: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(environment.BACKEND_BASE_URL + 'article/list/' + username);
  }

  public getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(environment.BACKEND_BASE_URL + 'article/list');
  }

  public createArticle(post: Article, username: string, img: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', img);
    formData.append('articleJsonStr', JSON.stringify(post));
    return this.httpClient.post<any>(environment.BACKEND_BASE_URL + 'article/create/' + username, formData);
  }

  public updateArticle(articleId: number, article: Article): Observable<any> {
    return this.httpClient.put<any>(environment.BACKEND_BASE_URL + 'article/update/' + articleId, article);
  }

  public deleteArticle(articleId: number): Observable<any> {
    return this.httpClient.delete<any>(environment.BACKEND_BASE_URL + 'article/delete/' + articleId);
  }

  public deleteImage(imgId: string): Observable<any> {
    return this.httpClient.delete<any>(environment.BACKEND_BASE_URL + 'article/delete/image/' + imgId);
  }

  public uploadImage(img: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', img);
    return this.httpClient.post<any>(environment.BACKEND_BASE_URL + 'article/image/upload', formData);
  }

  public addImageToArticle(img: File, articleId: number): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', img);
    return this.httpClient.post<any>(environment.BACKEND_BASE_URL + `article/image/add/${articleId}`, formData);
  }

  public getImagesByArticleId(articleId: number | undefined): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(environment.BACKEND_BASE_URL + 'article/image/list/' + articleId);
  }

  public getImages(): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(environment.BACKEND_BASE_URL + 'article/image/list/');
  }
}

