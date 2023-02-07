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
  miniatura!: Imagen;
  username!: string;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article },
    private utilsSvc: UtilsService,
    private readonly dialog: MatDialog,
    private articleSvc: ArticleService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.getImgsByArticleId(this.articleId);
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

  onUpload() {
    if (this.image != undefined) {
      if (this.image.size < environment.IMG_MAX_SIZE) {
        this.addImage(this.image, this.data.article.id);
      } else {
        const msg = this.translateService.instant('ImgMaximumExceed') + " 3MB";
        this.utilsSvc.showSnackBar(msg, 5000);
      }
    } else {
      const msg = this.translateService.instant('PleaseSelectImage');
      this.utilsSvc.showSnackBar(msg, 5000);
    };
  };
  
  private addImage(image: File, articleId: number) {
    this.articleSvc.addImageToArticle(image, articleId).subscribe({
      next: data => {
        this.utilsSvc.showSnackBar(data.mensaje, 3000);
        this.imagenes = [];
        this.getImgsByArticleId(this.data.article.id);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    });
  };

  onDeleteImage(id: string){
    this.dialog.open(DeleteComponent, {data: {imgId: id, article: this.article, option: "deleteImage"}});
  };

  onCaption(id: string) {
    this.dialog.open(CaptionComponent, { data: { imgId: id } });
  };

  handleImage(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    }
    if(this.image != null){
      fr.readAsDataURL(this.image);
    }   
  };
};
