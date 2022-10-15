import { Imagen } from './../../shared/models/imagen';
import { ArticleService } from './../../shared/services/article.service';
import { Article } from 'src/app/shared/models/article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  imagenes: Imagen[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
   this.getArticles();
  }

  private getArticles(){
    this.articleService.getArticles().subscribe({
      next: data => {
        this.articles = data;
      },
      error: err => {
        console.log(err);     
      }
     });
  }

  onImgs(articleId: number) {
    this.getImgsByArticleId(articleId);
    this.imagenes = [];
  }

  private getImgsByArticleId(id: number) {
    this.articleService.getImagesByArticleId(id).subscribe({
      next: (data: Imagen[]) => {
        this.imagenes = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }


}
