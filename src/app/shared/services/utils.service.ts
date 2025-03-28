import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from './../models/article';
import { Injectable } from '@angular/core';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private readonly snack: MatSnackBar,
    private readonly translateSvc: TranslateService) { };

  public sortArticlesBy(articles: Article[], orderBy: string): Article[] {

    switch (orderBy) {
      case 'title-az':
        return this.sortArticlesByTitleAZ(articles);
      case 'title-za':
        return this.sortArticlesByTitleZA(articles);
      case 'older':
        return this.sortArticlesByOlder(articles);
      case 'newer':
        return this.sortArticlesByNewer(articles);
      case 'more-activity':
        return this.sortArticlesByFiles(articles);
      case 'username-az':
        return this.sortArticlesByUsernameAZ(articles);
      case 'username-za':
        return this.sortArticlesByUsernameZA(articles);
      default:
        return articles;
    }
  }

  public sortArticlesByUsernameZA(articles: Article[]): Article[] {
    return articles.sort((article1, article2) => article2.usuario.nombreUsuario.localeCompare(article1.usuario.nombreUsuario));
  }

  public sortArticlesByUsernameAZ(articles: Article[]): Article[] {
    return articles.sort((article1, article2) => article1.usuario.nombreUsuario.localeCompare(article2.usuario.nombreUsuario));
  }

  public sortArticlesByTitleZA(articles: Article[]): Article[] {
    return articles.sort((article1, article2) => article2.title.localeCompare(article1.title));
  }

  public sortArticlesByTitleAZ(articles: Article[]): Article[] {
    return articles.sort((article1, article2) => article1.title.localeCompare(article2.title));
  }

  public sortArticlesByNewer(articles: Article[]): Article[] {
    return articles.sort(
      (article1: Article, article2: Article) => new Date(article2.date).getTime() - new Date(article1.date).getTime()
    );
  }

  public sortArticlesByOlder(articles: Article[]): Article[] {
    return articles.sort(
      (article1: Article, article2: Article) => new Date(article1.date).getTime() - new Date(article2.date).getTime()
    );
  }

  public sortImagesByNewer(articles: Imagen[]): Imagen[] {
    return articles.sort(
      (img1: Imagen, img2: Imagen) => new Date(img2.date).getTime() - new Date(img1.date).getTime()
    );
  }

  public sortImagesByOlder(articles: Imagen[]): Imagen[] {
    return articles.sort(
      (img1: Imagen, img2: Imagen) => new Date(img1.date).getTime() - new Date(img2.date).getTime()
    );
  }



  public sortArticlesByFiles(articles: Article[]): Article[] {
    return articles.sort(
      (article1: Article, article2: Article) => article2.imagenes.length - article1.imagenes.length
    );
  }

  public sortFilesByType(files: Imagen[]): Imagen[] {
    return files.sort((file1, file2) => file2.fileType.localeCompare(file1.fileType));
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
