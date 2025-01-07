import { UtilsService } from './../services/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Imagen } from '../models/imagen';
import { Article } from '../models/article';
import { GalleryImagesComponent } from 'src/app/components/crud/article-cards/gallery-images/gallery-images.component';
import { ArticleService } from '../services/article.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent {
  captionForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { imgId: string, article: Article, from: string },
    private readonly utilsSvc: UtilsService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly imageService: ImageService,
    private readonly articleSvc: ArticleService,
    private readonly translateSvc: TranslateService,
    private readonly router: Router,
  ) {
    this.initform();
  };

  onSubmit(img: Imagen) {
    if (this.captionForm.valid) {
      img.id = this.data.imgId;
      this.addCaption(img);
    };
  };

  private initform(): void {
    this.captionForm = this.fb.group({
      caption: ['', [Validators.required, Validators.maxLength(35)]]
    });
    this.patchValue();
  };

  private patchValue() {
    this.articleSvc.getImagesByArticleId(this.data.article.id).subscribe({
      next: imgs => {
        const imagenes: Imagen[] = imgs.filter(i => i.id == this.data.imgId);
        this.captionForm.patchValue(imagenes[0]);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    })
  }

  private addCaption(img: Imagen) {
    let msg = '';
    this.imageService.addCaption(img).subscribe({
      next: (data: any) => {
        this.dialog.closeAll();
        if (this.data.from == 'app-gallery-images') {
          this.dialog.open(GalleryImagesComponent, { data: { article: this.data.article } });
        }
        if (this.data.from == 'app-articleGallery') {
          this.redirectTo(this.router.url)
        }
        msg = this.translateSvc.instant('captionUpdated');
        this.utilsSvc.showSnackBar(msg, 3000);
      },
      error: (err: any) => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    });
  };

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
};
