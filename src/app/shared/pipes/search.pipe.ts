import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models/article';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(articles: Article[], title: string): Article[] {
    if (!title || title.length < 1) return articles;
    let filteredarticles: Article[] = [];
    for (const article of articles) {
      if (article.title.toLowerCase().indexOf(title.toLowerCase()) > -1) {
        filteredarticles.push(article)
      }
    }
    return filteredarticles;
  }

}
