// Services
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from './../../../shared/services/token.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { VideoService } from './../../../shared/services/video.service';
import { UtilsService } from './../../../shared/services/utils.service';
// Components
import { GalleryImagesComponent } from '../article-cards/gallery-images/gallery-images.component';
import { GalleryVideosComponent } from '../article-cards/gallery-videos/gallery-videos.component';
// Angular
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
// Material
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Models
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  durationInSeconds = 5;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article, imgId: string, videoId: number, option: string },
    private utisSvc: UtilsService,
    private tokenSvc: TokenService,
    private authSvc: AuthService,
    private readonly dialog: MatDialog,
    private readonly articleSvc: ArticleService,
    private videoSvc: VideoService,
    private readonly router: Router
  ) { }

  onDeleteArticle() {
    this.articleSvc.deleteArticle(this.data.article.id).subscribe({
      next: data => {
        this.utisSvc.showSnackBar(data.mensaje, 5000);
        this.redirectTo(this.router.url);
      }
    });
    this.dialog.closeAll();
  }

  onDeleteImage() {
    this.articleSvc.deleteImage(this.data.imgId).subscribe({
      next: (data: any) => {
        this.dialog.closeAll();
        this.dialog.open(GalleryImagesComponent, { data: { article: this.data.article } });
        this.utisSvc.showSnackBar(data.mensaje, 5000);
      },
      error: err => {
        this.utisSvc.showSnackBar(err.error.message, 5000);
      }
    })
  };

  onDeleteVideo() {
    this.videoSvc.delete(this.data.videoId).subscribe({
      next: data => {
        this.dialog.closeAll();
        this.dialog.open(GalleryVideosComponent, { data: { article: this.data.article } });
        this.utisSvc.showSnackBar(data.mensaje, 5000);
      },
      error: err => {
        this.utisSvc.showSnackBar(err.error.message, 5000);
      }
    })
  };

  onDeleteAccount() {
    const username: string = this.tokenSvc.getUsername() as string;
    this.authSvc.deleteAccount(username).subscribe({
      next: resp => {
        this.dialog.closeAll();
        this.tokenSvc.logOut();
        const msg = `Usuario ${username} eliminado`;
        this.utisSvc.showSnackBar(msg, 5000);
      },
      error: err => {
        this.utisSvc.showSnackBar(err.error.message, 5000);
      }
    });
  };

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  cancel() {
    this.dialog.closeAll();
  };

}
