import { Article } from './../models/article';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imagen } from '../models/imagen';

const ARTICLE_BASE_URL = environment.ARTICLE_BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  public getArticle(articleId: Number): Observable<Article> {
    return this.httpClient.get<Article>(ARTICLE_BASE_URL + 'one/' + articleId);
  }

  public getArticlesByUsername(username: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(ARTICLE_BASE_URL + 'list/' + username);
  }

  public getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(ARTICLE_BASE_URL + 'list');
  }

  public createArticle(post: Article, username: string): Observable<any> {
    return this.httpClient.post<any>(ARTICLE_BASE_URL + 'create/' + username, post);
  }

  public updateArticle(articleId: number, article: Article): Observable<any>{
    return this.httpClient.put<any>(ARTICLE_BASE_URL + 'update/' + articleId, article);
  }

  public deleteArticle(articleId: number): Observable<any>{
    return this.httpClient.delete<any>(ARTICLE_BASE_URL + 'delete/' + articleId);
  }

  public deleteImage(imgId: string): Observable<any>{
    return this.httpClient.delete<any>(ARTICLE_BASE_URL + 'delete/image/' + imgId);
  }

  public uploadImage(img: File): Observable<any>{
    const formData = new FormData();
    formData.append('multipartFile', img);
    return this.httpClient.post<any>(ARTICLE_BASE_URL + 'image/upload', formData);
  }

  public addImageToArticle(img: File, articleId: number): Observable<any>{
    const formData = new FormData();
    formData.append('multipartFile', img);
    return this.httpClient.post<any>(ARTICLE_BASE_URL + `image/add/${articleId}`, formData);
  }

  public getImagesByArticleId(articleId: number): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(ARTICLE_BASE_URL + 'image/list/' + articleId);
  }

  public getImages(): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(ARTICLE_BASE_URL + 'image/list/');
  }

  public getArticles(): Observable<Article[]>{
    return this.httpClient.get<Article[]>(environment.ARTICLES_LOCAL);
  }

  public getLocalArticle(id: Article): Observable<Article> {
    return this.httpClient.get<Article>(environment.ARTICLES_LOCAL + '/article/' + id);
  }

  public getLocalArticleByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(environment.ARTICLES_LOCAL + title);
  }

}
