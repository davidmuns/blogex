import { Video } from './../../../shared/models/video';
import { VideoService } from './../../../shared/services/video.service';
import { Observable } from 'rxjs';
import { Imagen } from './../../../shared/models/imagen';
import { ArticleService } from './../../../shared/services/article.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-articleGallery',
  templateUrl: './articleGallery.component.html',
  styleUrls: ['./articleGallery.component.scss']
})
export class ArticleGalleryComponent {
  @Input('articleId') articleId!: number | undefined;
  imagenes$!: Observable<Imagen[]>;
  indice!: number;
  videos$!: Observable<Video[]>;
  playerVars = {
    cc_lang_pref: 'es'
  }

  constructor(
    private articleSvc: ArticleService,
    private videoSvc: VideoService) { }

  getIndex(index: number) {
    this.indice = index;
  }

  showGallery() {
    this.getImgsByArticleId(this.articleId as number);
    this.getVideosByArticleId(this.articleId as number);
  }

  private getImgsByArticleId(id: number) {
    this.imagenes$ = this.articleSvc.getImagesByArticleId(id);
  }

  private getVideosByArticleId(id: number){
    this.videos$ = this.videoSvc.getAllbyArticleId(id);
  }

  hideGallery() {
    this.imagenes$ = new Observable();
    this.videos$ = new Observable();
    window.scroll(0, 0);
  }

}
