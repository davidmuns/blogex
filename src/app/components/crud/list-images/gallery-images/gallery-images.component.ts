import { CaptionComponent } from './../../../../shared/caption/caption.component';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DeleteComponent } from 'src/app/components/crud/delete/delete.component';
import { Imagen } from 'src/app/shared/models/imagen';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.scss']
})
export class GalleryImagesComponent implements OnInit {

  imagesByArticleId: Imagen[] = [];
  articles: Article[] = [];
  article$!: Observable<Article>;
  imagenes: Imagen[] = [];
  image!: File;
  miniatura!: Imagen;
  username!: string;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article },
    private readonly dialog: MatDialog,
    private snack: MatSnackBar,
    private articleSvc: ArticleService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private router: Router) { }

  ngOnInit() {
    this.getImgsByArticleId(this.data.article.id);
    this.getArticle();
  }

  private getArticle() {
    this.article$ = this.articleSvc.getArticle(this.data.article.id); 
  }

  private getImgsByArticleId(id: number) {
    this.articleSvc.getImagesByArticleId(id).subscribe({
      next: (data: Imagen[]) => {
        data.forEach(img => {
          this.imagenes.push(img);
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onUpload() {
    if (this.image != undefined) {
      if (this.image.size < environment.IMG_MAX_SIZE) {
        this.addImage(this.image, this.data.article.id);
      } else {
        this.snack.open(this.translateService.instant('ImgMaximumExceed') + " 3MB", "", { duration: 5000 });
      }
    } else {
      this.snack.open(this.translateService.instant('PleaseSelectImage'), "", { duration: 5000 });
    }
  }

  private addImage(image: File, articleId: number) {
    this.articleSvc.addImageToArticle(image, articleId).subscribe({
      next: data => {
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.imagenes = [];
        this.getImgsByArticleId(this.data.article.id);
        //this.redirectTo(this.router.url);
      },
      error: err => {
        this.toastrService.error(err, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    })
  }

  onDeleteImage(id: string){
    this.dialog.open(DeleteComponent, {data: {imgId: id, article: this.data.article, option: "deleteImage"}});
  }

  onCaption(id: string) {
    this.dialog.open(CaptionComponent, { data: { imgId: id } });
  }

  handleImage(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    }
    if(this.image != null){
      fr.readAsDataURL(this.image);
    }
    
  }

}
