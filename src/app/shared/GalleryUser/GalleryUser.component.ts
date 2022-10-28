import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Imagen } from './../models/imagen';
import { Article } from './../models/article';
import { TokenService } from './../services/token.service';
import { ArticleService } from './../services/article.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-GalleryUser',
  templateUrl: './GalleryUser.component.html',
  styleUrls: ['./GalleryUser.component.scss']
})
export class GalleryUserComponent implements OnInit {

  articles: Article[] = [];
  imagenes: Imagen[] = [];
  image!: File;
  miniatura!: Imagen;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { articleId: number },
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router,
    public tokenService: TokenService) { }

  ngOnInit() {
    this.getImgsByArticleId(this.data.articleId);
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
      this.addImage(this.image, this.data.articleId);
    } else {
      this.toastrService.error('Please select an image.', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }

  }

  private addImage(image: File, articleId: number) {
    this.articleService.addImageToArticle(image, articleId).subscribe({
      next: data => {
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.imagenes = [];
        this.getImgsByArticleId(this.data.articleId);
        //this.redirectTo(this.router.url);
      },
      error: err => {
        this.toastrService.error(err.error.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
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
        this.getImgsByArticleId(this.data.articleId);
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
