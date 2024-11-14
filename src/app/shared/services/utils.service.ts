import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from './../models/article';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private readonly snack: MatSnackBar,
    private readonly translateSvc: TranslateService){};

  public sortArticlesBy(articles: Article[], option: string): Article[] {

    switch (option) {
      case 'title':
        return this.sortArticlesAlphabeticallyByTitle(articles);
      case 'date':
        return this.sortArticlesByDate(articles); 
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

  public sortArticlesByDate(articles: Article[]): Article[] {
    return articles.sort(
      (article1: Article, article2: Article) => new Date(article2.date).getTime() - new Date(article1.date).getTime()
    );
  }
  
  public showSnackBar(msg: string, duration: number) {
    const action = this.translateSvc.instant('article.close');
    this.snack.open(msg, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  };
}
