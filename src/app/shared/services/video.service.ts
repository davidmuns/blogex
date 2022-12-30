import { Video } from './../models/video';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const VIDEO_BASE_URL = environment.VIDEO_BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  public getAllbyArticleId(articleId: number):Observable<Video[]> {
    return this.http.get<Video[]>(VIDEO_BASE_URL + 'list/' + articleId);
  }

  public save(video: Video): Observable<any> {
    return this.http.post<any>(VIDEO_BASE_URL + 'add', video);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(VIDEO_BASE_URL + 'delete/' + id);
  }

  public isValidUrl(url: string): boolean {
    if(!url.includes('.')){
      return false;
    }
    const case1 = url.split('=')[0].toUpperCase();
    const case2 = url.split('.')[1];  
    if (case1[case1.length - 1] === 'V' || case2.substring(0, 3) === 'be/') {
      return true;
    } else {
      return false;
    }
  }

  public getYoutubeId(url: string): string {
    if(!url.includes('=')){
      const urlSplit = url.split('.')[1];
      return urlSplit.substring(3, urlSplit.length);
    }
    if (url.split('=')[1].includes('&')) {
      return url.split('=')[1].split('&')[0];
    } else {
      return url.split('=')[1];
    }
  }
}
