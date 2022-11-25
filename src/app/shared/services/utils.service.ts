import { Article } from './../models/article';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public sortArticlesAlphabeticallyByTitle(articles: Article[]): Article[] {
    return articles
      .sort((article1, article2) => {
        return article1.title === article2.title ? 0 : article1.title > article2.title ? 1 : -1;
      })
  }

  public sortArticlesById(articles: Article[]): Article[] {
    return articles.sort((article1, article2) =>Number(article2.id) - Number(article1.id));
  }
}
