import { UtilsService } from './../../../shared/services/utils.service';
import { Video } from './../../../shared/models/video';
import { VideoService } from './../../../shared/services/video.service';
import { Imagen } from './../../../shared/models/imagen';
import { ArticleService } from './../../../shared/services/article.service';
import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';
import { DeleteComponent } from '../../crud/delete/delete.component';
import { CaptionComponent } from 'src/app/shared/caption/caption.component';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/shared/models/article';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-articleGallery',
  templateUrl: './articleGallery.component.html',
  styleUrls: ['./articleGallery.component.scss']
})
export class ArticleGalleryComponent implements OnInit {
  @Input('article') article!: Article;
  @Input('username') username!: string;
  imagenes: Imagen[] = [];
  videos: Video[] = [];
  urlmages: string[] = [];
  isModalOpen: boolean = false;
  indice: number = 0;
  playerVars = {
    cc_lang_pref: 'es'
  }

  constructor(
    public tokenSvc: TokenService,
    private readonly articleSvc: ArticleService,
    private readonly dialog: MatDialog,
    private readonly utilsSvc: UtilsService,
    private readonly videoSvc: VideoService) { console.log(this.article); }

  ngOnInit(): void {
    AOS.init();
    this.imagenes = this.article.imagenes;
    this.videos = this.article.videos;
  }

  onDeleteImage(id: string) {
    this.dialog.open(DeleteComponent, {
      data: { imgId: id, article: null, option: "deleteImage" },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  };

  onDeleteYoutube(id: number | undefined) {
    this.dialog.open(DeleteComponent, { 
      data: { videoId: id, article: null, option: "deleteVideo" },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  };

  onCaption(id: string) {
    this.dialog.open(CaptionComponent, {
      data: { imgId: id, article: this.article, from: 'app-articleGallery' },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  };

  openModal(index: number) {
    this.indice = index;
    const imageFiles = this.imagenes.filter(file => file.fileType === 'image');
    this.urlmages = imageFiles.map(file => file.url);
    const clickedFile = this.imagenes[index];
    if (clickedFile.fileType === 'image') {
      this.indice = imageFiles.findIndex(file => file.id === clickedFile.id); // Encuentra el índice dentro de las imágenes
      this.isModalOpen = true;
    }
  }

  closeCarousel(): void {
    this.isModalOpen = false;
  }

  prevImage(): void {
    this.indice = (this.indice - 1 + this.urlmages.length) % this.urlmages.length;
  }

  nextImage(): void {
    this.indice = (this.indice + 1) % this.urlmages.length;
  }

  getTransform(): string {
    return `translateX(-${this.indice * 100}%)`;
  }

 
}
