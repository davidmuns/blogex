import { Observable } from 'rxjs';
import { Imagen } from './../../../shared/models/imagen';
import { ArticleService } from './../../../shared/services/article.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-articleGallery',
  templateUrl: './articleGallery.component.html',
  styleUrls: ['./articleGallery.component.scss']
})
export class ArticleGalleryComponent {
  @Input('articleId') articleId!: number | undefined;
  imagenes$!: Observable<Imagen[]>;
  imagenes!: Imagen[];
  indice!: number;

  constructor(private articleSvc: ArticleService) { }

  getIndex(index: number) {
    this.indice = index;
  }

  showGallery() {
    this.getImgsByArticleId(this.articleId);
  }

  onChange(){
    console.log('change');
    
  }

  private getImgsByArticleId(id: number | undefined) {
    this.imagenes$ = this.articleSvc.getImagesByArticleId(id);
  }
  hideGallery() {
    this.imagenes$ = new Observable();
    window.scroll(0, 0);
  }

}
