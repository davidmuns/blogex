import { SortFileByTypePipe } from './../../../shared/pipes/sort-file-by-type.pipe';
import { UtilsService } from './../../../shared/services/utils.service';
import { Video } from './../../../shared/models/video';
import { VideoService } from './../../../shared/services/video.service';
import { Observable } from 'rxjs';
import { Imagen } from './../../../shared/models/imagen';
import { ArticleService } from './../../../shared/services/article.service';
import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-articleGallery',
  templateUrl: './articleGallery.component.html',
  styleUrls: ['./articleGallery.component.scss']
})
export class ArticleGalleryComponent implements OnInit {
  @Input('articleId') articleId!: number | undefined;
  imagenes: Imagen[] = [];
  urlmages: string[] = [];
  isModalOpen: boolean = false;
  indice: number = 0;
  videos$!: Observable<Video[]>;
  playerVars = {
    cc_lang_pref: 'es'
  }
  isZoomed: boolean = false;

  constructor(
    private articleSvc: ArticleService,
    private utilsSvc: UtilsService,
    private videoSvc: VideoService) { }

  ngOnInit(): void {
    AOS.init();
  }

  getIndex(index: number) {
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

  showGallery() {
    this.getImgsByArticleId(this.articleId as number);
    this.getVideosByArticleId(this.articleId as number);
  }

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed; // Alterna entre activar y desactivar el zoom
  }

  private getImgsByArticleId(id: number) {
    this.articleSvc.getImagesByArticleId(id).subscribe({
      next: data => {
        this.imagenes = this.utilsSvc.sortFilesByType(data);
      }
    })
  }

  private getVideosByArticleId(id: number) {
    this.videos$ = this.videoSvc.getAllByArticleId(id);
  }

  hideGallery() {
    this.imagenes = [];
    this.videos$ = new Observable();
    // window.scroll(0, 0);
  }

}
