import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models/article';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(articles: Article[] = [], searchTerm: string = ''): Article[] {
    if (!searchTerm.trim()) return articles;

    const normalizedSearchTerm = this.normalizeText(searchTerm);

    return articles.filter(article =>
      this.normalizeText(article.title).includes(normalizedSearchTerm) ||
      this.normalizeText(article.usuario.nombreUsuario).includes(normalizedSearchTerm) ||
      this.normalizeText(article.tags.map(tag => tag.name).join(' ')).includes(normalizedSearchTerm)
    );
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // Descompone caracteres como á en a
      .replace(/[\u0300-\u036f]/g, ''); // Elimina los diacríticos
  }
}

