import { Article } from './../models/article';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public sortArticlesBy(articles: Article[], option: string): Article[] {
    switch (option) {
      case 'title':
        return articles = this.sortArticlesAlphabeticallyByTitle(articles);
        break;
      case 'date':
        return articles = this.sortArticlesById(articles);
        break;
      default:
        return articles;
    }
  }

  public sortArticlesAlphabeticallyByTitle(articles: Article[]): Article[] {
    return articles
      .sort((article1, article2) => {
        return article1.title === article2.title ? 0 : article1.title > article2.title ? 1 : -1;
      })
  }

  public sortArticlesById(articles: Article[]): Article[] {
    return articles.sort((article1, article2) => Number(article2.id) - Number(article1.id));
  }
}
