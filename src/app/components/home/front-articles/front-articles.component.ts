import { ArticleService } from './../../../shared/services/article.service';
import { UtilsService } from './../../../shared/services/utils.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Imagen } from './../../../shared/models/imagen';
import { Article } from 'src/app/shared/models/article';
import { ActivatedRoute, Router } from '@angular/router';
import AOS from 'aos';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-front-articles',
  templateUrl: './front-articles.component.html',
  styleUrls: ['./front-articles.component.scss']
})
export class FrontArticlesComponent implements OnInit {

  @Input() numbers1!: number;
  @Input() numbers2!: number;

  articles: Article[] = [];
  imagenes: Imagen[] = [];
  imagenesAll: Imagen[] = [];
  sortBy = '';
  pageSizeOptions: number[] = [4, 8, 16, 20, 24];
  pageSize: number = 8;
  pageNumber: number = 1;
  filterByTitle = '';

  constructor(
    private readonly articleService: ArticleService,
    private readonly utilsSvc: UtilsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getArticles();
      // Captura el parámetro 'search' de la URL
    this.route.queryParams.subscribe(params => {
      if (params['tagName']) {
        this.filterByTitle = params['tagName']; // Establece el valor del campo de búsqueda
        this.scrollToSearch(); // Llama a la función para desplazar la página
      }
    });
    AOS.init();
  }

  onSortBy(selectedOption: string) {
    this.sortBy = selectedOption;
    this.getArticles();
  };

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
  };

  private getArticles() {
    this.articleService.getAll().subscribe({
      next: data => {
        this.articles = this.utilsSvc.sortArticlesBy(data, this.sortBy);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onClick(articleId: number) {
    this.router.navigate(['article/' + articleId]);
  }

  // Función para desplazar la página hacia el campo de búsqueda
  scrollToSearch() {
    window.scroll({
      top: 1400,
      left: 0,
      behavior: 'smooth'
    });
  }
}
