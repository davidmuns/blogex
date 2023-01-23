import { Observable } from 'rxjs';
import { Imagen } from 'src/app/shared/models/imagen';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  public addCaption(img: Imagen): Observable<any> {
    return this.httpClient.put<any>(environment.BACKEND_BASE_URL + 'imagen/add-caption', img);
  }
}
