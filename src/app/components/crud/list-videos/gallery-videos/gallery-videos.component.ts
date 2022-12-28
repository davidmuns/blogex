import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CaptionComponent } from 'src/app/shared/GalleryUser/caption/caption.component';
import { Article } from 'src/app/shared/models/article';
import { Imagen } from 'src/app/shared/models/imagen';
import { ArticleService } from 'src/app/shared/services/article.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from '../../delete/delete.component';

@Component({
  selector: 'app-gallery-videos',
  templateUrl: './gallery-videos.component.html',
  styleUrls: ['./gallery-videos.component.scss']
})
export class GalleryVideosComponent implements OnInit {

  urlForm!: FormGroup;
  imagesByArticleId: Imagen[] = [];
  articles: Article[] = [];
  article$!: Observable<Article>;
  imagenes: Imagen[] = [];
  image!: File;
  miniatura!: Imagen;
  username!: string;
  articleId!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { articleId: number },
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private snack: MatSnackBar,
    private articleSvc: ArticleService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private router: Router) { }

  ngOnInit() {
    // this.getImgsByArticleId(this.data.articleId);
    this.initform();
    this.articleId = this.data.articleId;
    this.getArticle();
  }

  private initform(): void {
    this.urlForm = this.fb.group({
      caption: ['', Validators.required]
    })
  }
  onSubmit(url: string) {
    console.log(url);
    
  }
  private getArticle() {
    this.article$ = this.articleSvc.getArticle(this.articleId); 
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
        this.addImage(this.image, this.articleId);
      } else {
        this.snack.open(this.translateService.instant('ImgMaximumExceed') + " 2MB", "", { duration: 5000 });
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
        this.getImgsByArticleId(this.articleId);
        //this.redirectTo(this.router.url);
      },
      error: err => {
        this.toastrService.error(err, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    })
  }

  onDeleteImage(imgId: string){
    this.dialog.open(DeleteComponent, {data: {imgId: `${imgId}`, articleId: this.articleId, option: "deleteImage"}});
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
