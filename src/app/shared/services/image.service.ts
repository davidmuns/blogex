import { Observable } from 'rxjs';
import { Imagen } from 'src/app/shared/models/imagen';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const IMG_BASE_URL = environment.IMG_BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { 

  }

  public addCaption(img: Imagen): Observable<any> {
    return this.httpClient.put<any>(IMG_BASE_URL + 'add-caption', img);
  }
}
