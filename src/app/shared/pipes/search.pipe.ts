import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models/article';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(articles: Article[], title: string): Article[] {
    if (!title || title.length < 1) return articles;
    return articles
      .filter(article => article.title.toLowerCase().indexOf(title.toLowerCase()) > -1);
  }

}
