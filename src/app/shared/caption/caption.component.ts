import { UtilsService } from './../services/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Imagen } from '../models/imagen';
import { Article } from '../models/article';
import { GalleryImagesComponent } from 'src/app/components/crud/article-cards/gallery-images/gallery-images.component';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent implements OnInit {
  captionForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imgId: string, article: Article },
    private utilsSvc: UtilsService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private imageService: ImageService
    ) { };

  ngOnInit(): void {
    this.initform();
  };

  private initform(): void {
    this.captionForm = this.fb.group({
      caption: ['', Validators.required]
    });
  };

  onSubmit(img: Imagen) { 
    if(this.captionForm.valid){
      img.id = this.data.imgId;
      this.addCaption(img);
    };
  };

  private addCaption(img: Imagen){
    this.imageService.addCaption(img).subscribe({
      next: (data: any) => {
        this.utilsSvc.showSnackBar(data.mensaje, 3000);
        this.dialog.closeAll();
        this.dialog.open(GalleryImagesComponent, { data: { article: this.data.article } });
      },
      error: (err: any) => {
        this.utilsSvc.showSnackBar(err.error.message, 3000);
      }
    });
  };
};
