import { Video } from './../models/video';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  public getAllByArticleId(articleId: number): Observable<Video[]> {
    return this.http.get<Video[]>(environment.BACKEND_BASE_URL + 'video/list/' + articleId);
  }

  public save(file: File, articleId: number): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', file);
    return this.http.post<any>(environment.BACKEND_BASE_URL + `video/add/${articleId}`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.BACKEND_BASE_URL + 'video/delete/' + id);
  }

}
