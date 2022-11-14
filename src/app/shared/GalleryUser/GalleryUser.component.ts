import { CaptionComponent } from './caption/caption.component';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Imagen } from './../models/imagen';
import { Article } from './../models/article';
import { ArticleService } from './../services/article.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-GalleryUser',
  templateUrl: './GalleryUser.component.html',
  styleUrls: ['./GalleryUser.component.scss']
})
export class GalleryUserComponent implements OnInit {

  imagesByArticleId: Imagen[] = [];
  articles: Article[] = [];
  imagenes: Imagen[] = [];
  image!: File;
  miniatura!: Imagen;
  username!: string;
  articleId!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { articleId: number },
    private readonly dialog: MatDialog,
    private snack: MatSnackBar,
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.getImgsByArticleId(this.data.articleId);
    this.articleId = this.data.articleId;
  }

  private getImgsByArticleId(id: number) {
    this.articleService.getImagesByArticleId(id).subscribe({
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
  handleImage(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    }
    fr.readAsDataURL(this.image);
  }

  onUpload() {
    if (this.image != undefined) {
      if (this.image.size < environment.IMG_MAX_SIZE) {
        this.addImage(this.image, this.articleId);
      } else {
        this.snack.open("Image exceeds its maximum permitted size of 2MB.", "", { duration: 5000 });
      }
    } else {
      this.snack.open("Please select one image.", "", { duration: 5000 });
    }
  }

  onCaption(id: string) {
    this.dialog.open(CaptionComponent, { data: { imgId: id } });
  }

  private addImage(image: File, articleId: number) {
    this.articleService.addImageToArticle(image, articleId).subscribe({
      next: data => {
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.imagenes = [];
        this.getImgsByArticleId(this.articleId);
        //this.redirectTo(this.router.url);
      },
      error: err => {
        // this.toastrService.error("Image exceeds its maximum permitted size of 2MB", '', {
        //   timeOut: 3000, positionClass: 'toast-top-center'
        // });
      }
    })

  }

  onDeleteImage(imgId: string) {
    this.articleService.deleteImage(imgId).subscribe({
      next: (data: any) => {
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        //this.redirectTo(this.router.url);
        //window.location.reload();
        this.imagenes = [];
        this.getImgsByArticleId(this.articleId);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // redirectTo(uri: string) {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  //     this.router.navigate([uri]));
  // }

}
