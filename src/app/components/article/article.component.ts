import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  post!: Article | undefined;
  idPost!: number;

  constructor(
    private readonly route: ActivatedRoute,
    private articleSvc: ArticleService,
  ) { }

  ngOnInit(): void {
    this.idPost = this.route.snapshot.params['id'];
    this.getArticleById(this.idPost);
  }

  private getArticleById(id: number) {
    this.articleSvc.getArticle(id)
      .subscribe(data => this.post = data);
  }

}
