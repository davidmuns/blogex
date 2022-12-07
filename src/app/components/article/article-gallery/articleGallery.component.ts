import { Imagen } from './../../../shared/models/imagen';
import { ArticleService } from './../../../shared/services/article.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-articleGallery',
  templateUrl: './articleGallery.component.html',
  styleUrls: ['./articleGallery.component.scss']
})
export class ArticleGalleryComponent implements OnInit {
  @Input('articleId') articleId!: number | undefined;
  imagenes: Imagen[] = [];
  indice!: number;

  constructor(private articleSvc: ArticleService) { }

  ngOnInit() {
    
  }

  getIndex(index: number) {
    this.indice = index;
  }

  showGallery() {
    console.log('articleId', this.articleId);
    this.getImgsByArticleId(this.articleId);
  }

  private getImgsByArticleId(id: number | undefined) {
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
