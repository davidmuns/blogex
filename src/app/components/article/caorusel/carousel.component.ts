import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Imagen } from 'src/app/shared/models/imagen';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() imagenes!: Imagen[];
  @Input() index: number = 0;
  @Output() close = new EventEmitter<void>();
  indice = 0;
  urlmages: string[] = [];
  isDragging = false;
  startX = 0;
  currentTranslate = 0;
  prevTranslate = 0;

  ngOnInit(): void {
    this.setupCarousel();
  }

  setupCarousel() {
    this.indice = this.index;
    const imageFiles = this.imagenes.filter(file => file.fileType === 'image');
    this.urlmages = imageFiles.map(file => file.url);
    const clickedFile = this.imagenes[this.indice];
    if (clickedFile.fileType === 'image') {
      this.indice = imageFiles.findIndex(file => file.id === clickedFile.id); // Encuentra el índice dentro de las imágenes
    }
  }

  closeCarousel(): void {
    this.close.emit();
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
