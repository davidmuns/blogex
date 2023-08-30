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

  public getAllbyArticleId(articleId: number): Observable<Video[]> {
    return this.http.get<Video[]>(environment.BACKEND_BASE_URL + 'video/list/' + articleId);
  }

  public save(video: Video): Observable<any> {
    return this.http.post<any>(environment.BACKEND_BASE_URL + 'video/add', video);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.BACKEND_BASE_URL + 'video/delete/' + id);
  }

  public isValidUrl(url: string): boolean {
    if (!url.includes('.')) {
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
    if (url.includes('youtube')) {
      return url.split('=')[1];
    }
    if (url.includes('youtu.be') && url.includes('?')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }
    return url.split('youtu.be')[1];
  }
}
