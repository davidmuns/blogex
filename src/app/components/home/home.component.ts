import { Imagen } from './../../shared/models/imagen';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/shared/services/token.service';
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

}
