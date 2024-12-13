// Services
import { UtilsService } from './../../../../shared/services/utils.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { TranslateService } from '@ngx-translate/core';
// Components
import { CaptionComponent } from './../../../../shared/caption/caption.component';
import { DeleteComponent } from 'src/app/components/crud/delete/delete.component';
// Angular
import { environment } from 'src/environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
// Material
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// Models
import { Imagen } from 'src/app/shared/models/imagen';
import { Article } from 'src/app/shared/models/article';
// Animate on scroll library => https://michalsnik.github.io/aos/
import AOS from 'aos';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.scss']
})
export class GalleryImagesComponent implements OnInit {

  imagesByArticleId: Imagen[] = [];
  articles: Article[] = [];
  article = this.data.article;
  articleId = this.article.id;
  imagenes: Imagen[] = [];
  image!: File;
  username!: string;
  uploading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article },
    private readonly utilsSvc: UtilsService,
    private readonly dialog: MatDialog,
    private readonly articleSvc: ArticleService,
    private readonly translateService: TranslateService) { }

  ngOnInit() {
    AOS.init();
    this.getImgsByArticleId(this.articleId);
  };

  handleImage(event: any) {
    this.image = event.target.files[0];
    this.onUpload();
  };

  onUpload() {
    if(this.image.type.startsWith('image')){
      if (this.image.size < environment.IMG_MAX_SIZE) {
        this.addImage(this.image, this.data.article.id);
      } else {
        const size = environment.IMG_MAX_SIZE / 1000000;
        const msg = this.translateService.instant('ImgMaximumExceed') + " (" +  size + " MB)";
        this.utilsSvc.showSnackBar(msg, 10000);
        this.dialog.closeAll();
      }
    }

    if(this.image.type.startsWith('video')){
      if (this.image.size < environment.VIDEO_MAX_SIZE) {
        this.addImage(this.image, this.data.article.id);
      } else {
        const size = environment.VIDEO_MAX_SIZE / 1000000;
        const msg = this.translateService.instant('VideoMaximumExceed') + " (" +  size + " MB)";
        this.utilsSvc.showSnackBar(msg, 10000);
        this.dialog.closeAll();
      }
    }
  };

  onDeleteImage(id: string){
    this.dialog.open(DeleteComponent, {
      data:  {imgId: id, article: this.article, option: "deleteImage" },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  };

  onCaption(id: string) {
    this.dialog.open(CaptionComponent, {
      data: { imgId: id, article: this.article, from: 'app-gallery-images' },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  };

  private addImage(image: File, articleId: number) {
    this.uploading = true;
    this.articleSvc.addImageToArticle(image, articleId).subscribe({
      next: data => {
        this.uploading = false;
        this.imagenes = [];
        const msg = this.translateService.instant('crud.image-list.posted');
        this.utilsSvc.showSnackBar(msg, 3000);
        this.getImgsByArticleId(this.data.article.id);
      },
      error: err => {
        this.uploading = false;
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    });
  };

  private getImgsByArticleId(id: number) {
    this.articleSvc.getImagesByArticleId(id).subscribe({
      next: (data: Imagen[]) => {
        data.forEach(img => {
          this.imagenes.push(img);
        });
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    });
  };
};
