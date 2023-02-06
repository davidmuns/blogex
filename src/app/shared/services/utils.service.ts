import { Article } from './../models/article';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public sortArticlesBy(articles: Article[], option: string): Article[] {

    switch (option) {
      case 'title':
        return this.sortArticlesAlphabeticallyByTitle(articles);
      case 'date':
        return this.sortArticlesById(articles); 
      default:
        return articles;
    }
  }

  public sortArticlesAlphabeticallyByTitle(articles: Article[]): Article[] {
    return articles.sort((article1, article2) => {
      let result = 0;
      if (article1.title > article2.title) {
        result = 1;
      } else if (article1.title < article2.title) {
        result = -1;
      }
      return result;
    });
  }

  public sortArticlesById(articles: Article[]): Article[] {
    return articles.sort((article1, article2) => Number(article2.id) - Number(article1.id));
  }
}
