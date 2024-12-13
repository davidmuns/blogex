import { UtilsService } from './../../../shared/services/utils.service';
import { Video } from './../../../shared/models/video';
import { VideoService } from './../../../shared/services/video.service';
import { Observable } from 'rxjs';
import { Imagen } from './../../../shared/models/imagen';
import { ArticleService } from './../../../shared/services/article.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import AOS from 'aos';
import { DeleteComponent } from '../../crud/delete/delete.component';
import { CaptionComponent } from 'src/app/shared/caption/caption.component';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/shared/models/article';
import { GalleryImagesComponent } from '../../crud/article-cards/gallery-images/gallery-images.component';
import { EditComponent } from '../../crud/posts/edit/edit.component';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-articleGallery',
  templateUrl: './articleGallery.component.html',
  styleUrls: ['./articleGallery.component.scss']
})
export class ArticleGalleryComponent implements OnInit {
  @Input('article') article: any;
  @Input('username') username!: string;
  imagenes: Imagen[] = [];
  urlmages: string[] = [];
  isModalOpen: boolean = false;
  indice: number = 0;
  videos$!: Observable<Video[]>;
  playerVars = {
    cc_lang_pref: 'es'
  }
  isZoomed!: number | null;
  constructor(
    public tokenSvc: TokenService,
    private readonly articleSvc: ArticleService,
    private readonly dialog: MatDialog,
    private readonly utilsSvc: UtilsService,
    private readonly videoSvc: VideoService) { }

  ngOnInit(): void {
    AOS.init();
  }

  showGallery() { 
    this.getImgsByArticleId(this.article.id as number);
    this.getVideosByArticleId(this.article.id as number);
  }

  hideGallery() {
    this.imagenes = [];
    this.videos$ = new Observable();
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
    // Filtrar solo las imágenes
    const imageFiles = this.imagenes.filter(file => file.fileType === 'image');

    // Crear la lista de URLs de las imágenes
    this.urlmages = imageFiles.map(file => file.url);

    // Obtener la URL del archivo seleccionado
    const clickedFile = this.imagenes[index];

    // Verificar si el archivo es una imagen y encontrar su índice en la lista filtrada
    if (clickedFile.fileType === 'image') {
      this.indice = imageFiles.findIndex(file => file.id === clickedFile.id); // Encuentra el índice dentro de las imágenes
      this.isModalOpen = true; // Abre el modal
    }
  }

  // Cierra el modal
  closeCarousel(): void {
    this.isModalOpen = false;
  }

  // Navega a la imagen anterior
  prevImage(): void {
    this.indice = (this.indice - 1 + this.urlmages.length) % this.urlmages.length;
  }

  // Navega a la siguiente imagen
  nextImage(): void {
    this.indice = (this.indice + 1) % this.urlmages.length;
  }

  // Alterna el zoom al hacer clic en una imagen
  toggleZoom(event: Event, index: number): void {
    event.stopPropagation(); // Evita que el evento se propague al documento
    this.isZoomed = this.isZoomed === index ? null : index;
  }

  // Detecta clics fuera de las imágenes
  @HostListener('document:click', ['$event'])
  handleClickOutside(): void {
    this.isZoomed = null; // Resetea el zoom
  }

  private getImgsByArticleId(id: number) {
    this.articleSvc.getImagesByArticleId(id).subscribe({
      next: data => {
        this.imagenes = this.utilsSvc.sortFilesByType(data);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    })
  }

  private getVideosByArticleId(id: number) {
    this.videos$ = this.videoSvc.getAllByArticleId(id);
  }
}
