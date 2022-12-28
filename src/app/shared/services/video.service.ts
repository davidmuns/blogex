import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  urlIds: string[] = [];

  constructor() { }

  public isValidUrl(url: string): boolean {
    const firstElement = url.split('=')[0].toUpperCase();
    if (firstElement[firstElement.length - 1] === 'V') {
      return true;
    } else {
      return false;
    }
  }

  public getUrlId(url: string): string {
    if (url.split('=')[1].includes('&')) {
      return url.split('=')[1].split('&')[0];
    } else {
      return url.split('=')[1];
    }
  }
}
