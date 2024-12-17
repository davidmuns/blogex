import { UtilsService } from './../../../shared/services/utils.service';
import { Video } from './../../../shared/models/video';
import { Imagen } from './../../../shared/models/imagen';
import {Component, Input, OnInit } from '@angular/core';
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
  isDragging = false;
  startX = 0;
  currentTranslate = 0;
  prevTranslate = 0;
  playerVars = {
    cc_lang_pref: 'es'
  }

  constructor(
    public tokenSvc: TokenService,
    private readonly dialog: MatDialog,
    private readonly utilsSvc: UtilsService) {}

  ngOnInit(): void {
    AOS.init();
    this.imagenes = this.utilsSvc.sortFilesByType(this.article.imagenes);
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
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
