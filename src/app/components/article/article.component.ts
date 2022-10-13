import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public post$!: Observable<Article>;

  constructor(private readonly route: ActivatedRoute, private articleSvc: ArticleService) {  }

  ngOnInit(): void {
    const idPost = this.route.snapshot.params["id"];
    this.post$ = this.articleSvc.getLocalArticle(idPost);
  }

    //In case of assets file is a JSON format
   /* private async getArticles(){
    this.articleSvc.getArticles()
      .subscribe(res => {
        this.articles = res;
      })
  } */
 
}
