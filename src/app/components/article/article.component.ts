import { Imagen } from './../../shared/models/imagen';
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

  public post!: Article | undefined;
  imagenes!: Imagen[] | undefined;
  indice!: number;


  constructor(
    private readonly route: ActivatedRoute,
    private articleSvc: ArticleService,
  ) { }

  ngOnInit(): void {
    const idPost: number = this.route.snapshot.params['id'];   //snapshot.params['id'];
    this.getArticleById(idPost);
  }

  private getArticleById(id: number) {
    this.articleSvc.getArticle(id)
      .subscribe(data => this.post = data);
  }

  showGallery(id: number | undefined) {
    const idArticle: number = id as number;
    this.getImgsByArticleId(idArticle);

  }
  getIndex(index: number) {
    this.indice = index;
    console.log('index: ', this.indice);

  }

  private getImgsByArticleId(id: number) {
    this.articleSvc.getImagesByArticleId(id).subscribe({
      next: (data: Imagen[]) => {
        this.imagenes = data;
      }
    })
  }

  hideGallery() {
    this.imagenes = [];
  }

}
