import { UtilsService } from './../../../shared/services/utils.service';
import { Video } from './../../../shared/models/video';
import { Imagen } from './../../../shared/models/imagen';
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
    // this.indice = (this.indice - 1 + this.urlmages.length) % this.urlmages.length;
    this.indice--;
    this.syncTranslateWithIndex(true, 'arrow');

  }

  nextImage(): void {
    // this.indice = (this.indice + 1) % this.urlmages.length;
    this.indice++;
    this.syncTranslateWithIndex(true, 'arrow');
  }

  getTransform(): string {
    return `translateX(-${this.indice * 100}%)`;
  }

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    
    // Pausar transición mientras se arrastra
    const track = document.querySelector('.carousel-track') as HTMLElement;
    track.style.transition = 'none';
    
  }
   // Detectar movimiento durante el arrastre
   onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - this.startX;
    this.currentTranslate = this.prevTranslate + deltaX;
    const track = document.querySelector('.carousel-track') as HTMLElement;
    track.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  
  onTouchEnd(): void {
    if (!this.isDragging) return;

    this.isDragging = false;

    const itemWidth = window.innerWidth;
    const movedBy = this.currentTranslate - this.prevTranslate;

    // Determinar si el movimiento es suficiente para cambiar de imagen
    if (movedBy < -itemWidth * 0.10 && this.indice < this.urlmages.length - 1) {
      this.indice++;
    } else if (movedBy > itemWidth * 0.10 && this.indice > 0) {
      this.indice--;
    }

    this.syncTranslateWithIndex(true, 'touch');
  }

  private syncTranslateWithIndex(applyTransition = false, action: 'touch' | 'arrow' = 'touch'): void {
    const itemWidth = window.innerWidth;
    this.currentTranslate = -this.indice * itemWidth;
    this.prevTranslate = this.currentTranslate;

    const track = document.querySelector('.carousel-track') as HTMLElement;

    if (applyTransition) {
      track.style.transition =
        action === 'touch'
          ? 'transform 1s ease' // Transición móvil
          : 'transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)'; // Transición flechas
    }

    track.style.transform = `translateX(${this.currentTranslate}px)`;

    // if (applyTransition) {
    //   setTimeout(() => {
    //     track.style.transition = 'none'; // Desactivar transición para futuros movimientos
    //   }, action === 'touch' ? 1000 : 1000); // Duración según el tipo de interacción
    // }
    if (applyTransition) {
      setTimeout(() => {
        track.style.transition = 'none'; // Desactivar transición para futuros movimientos
      }, 1000); // Duración según el tipo de interacción
    }
  }

 
}
