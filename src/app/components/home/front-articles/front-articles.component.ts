import { ArticleService } from './../../../shared/services/article.service';
import { UtilsService } from './../../../shared/services/utils.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Imagen } from './../../../shared/models/imagen';
import { Article } from 'src/app/shared/models/article';
import { Router } from '@angular/router';
import AOS from 'aos';

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

  constructor(private articleService: ArticleService,
    private router: Router,
    private utilsService: UtilsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getArticles();
    AOS.init();
  }

  private getArticles() {
    this.articleService.getAll().subscribe({
      next: data => {
        this.articles =  this.utilsService.sortArticlesById(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onClick(articleId: number) {
    this.router.navigate(['article/' + articleId]);
  }
}
