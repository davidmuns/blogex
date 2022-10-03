import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../../shared/services/article.service';
import { IArticle } from './../../shared/models/iarticle';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles: IArticle[] = []

  constructor(private articleService: ArticleService) {
    this.onList();
  }

  ngOnInit(): void {
  }

  onList(){
    this.articleService.getAll().subscribe({
      next: data => {
        this.articles = data;
        console.log(this.articles);

      },
      error: err => {

      }
    })
  }

}
