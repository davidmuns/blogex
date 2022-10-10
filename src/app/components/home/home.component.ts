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
  
  constructor(
    private tokenService: TokenService,
    private articleService: ArticleService,
    private toastrService: ToastrService) { }

  ngOnInit(): void { 
    this.getAllArticlesByUsername();
  }

  private getAllArticlesByUsername(){
    const username = this.tokenService.getUsername() as string;
    this.articleService.getAll(username).subscribe({
      next: data => {
        console.log(data);
        
        this.articles = data;
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

  onDelete(articleId: Number){
    this.articleService.deleteArticle(articleId).subscribe({
      next: data => {
        console.log(data.mensaje);
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.getAllArticlesByUsername();
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

  onEdit(articleId: Number){

  }

}