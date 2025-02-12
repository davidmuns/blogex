// Services
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from './../../../shared/services/token.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { VideoService } from './../../../shared/services/video.service';
import { UtilsService } from './../../../shared/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
// Components
import { GalleryImagesComponent } from '../article-cards/gallery-images/gallery-images.component';
import { GalleryVideosComponent } from '../article-cards/gallery-videos/gallery-videos.component';
// Angular
import { Component, Inject, OnInit } from '@angular/core';
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

  buttons = [
    { option: 'deleteArticle', text: this.translateSvc.instant('Article'), action: () => this.deleteArticle() },
    { option: 'deleteImage', text: this.translateSvc.instant('Image'), action: () => this.deleteImage() },
    { option: 'deleteVideo', text: this.translateSvc.instant('Video'), action: () => this.deleteVideo() },
    { option: 'deleteAccount', text: this.translateSvc.instant('delete.account'), action: () => this.deleteAccount() },
  ];
  durationInSeconds = 5;
  username: string = this.tokenSvc.getUsername() as string;
  uploading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article, imgId: string, videoId: number, option: string },
    private readonly utilsSvc: UtilsService,
    private readonly tokenSvc: TokenService,
    private readonly authSvc: AuthService,
    private readonly dialog: MatDialog,
    private readonly articleSvc: ArticleService,
    private readonly videoSvc: VideoService,
    private readonly router: Router,
    private readonly translateSvc: TranslateService
  ) { }

  deleteArticle() {
    this.uploading = true;
    let msg = '';
    this.articleSvc.deleteArticle(this.data.article.id).subscribe({
      next: data => {
        this.dialog.closeAll();
        setTimeout(() => {
          this.uploading = false;
          this.redirectTo(this.router.url);
          msg = this.translateSvc.instant('crud.delete.ok');
          this.utilsSvc.showSnackBar(msg, 3000);
        }, 700);
        this.redirectTo(this.router.url);
      }
    });
  }

  deleteImage() {
    this.uploading = true;
    this.articleSvc.deleteImage(this.data.imgId).subscribe({
      next: (data: any) => {
        this.uploading = false;
        this.dialog.closeAll();
        if (this.data.article != null){
          this.dialog.open(GalleryImagesComponent, { data: { article: this.data.article } });
        }else{
          this.redirectTo(this.router.url)
        }
        const msg = this.translateSvc.instant('crud.image-list.deleted');
        this.utilsSvc.showSnackBar(msg, 3000);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 3000);
      }
    })
  };

  deleteVideo() {
    this.uploading = true;
    this.videoSvc.delete(this.data.videoId).subscribe({
      next: data => {
        this.uploading = false;
        this.dialog.closeAll();
        if (this.data.article != null){
          this.dialog.open(GalleryVideosComponent, { data: { article: this.data.article } });
        }else{
          this.redirectTo(this.router.url)
        }
        const msg = this.translateSvc.instant('crud.list-videos.deleted');
        this.utilsSvc.showSnackBar(msg, 5000);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    })
  };

  deleteAccount() {
    // Open dialog window before deleting
    const confirm = window.confirm(this.translateSvc.instant('delete.confirm'));
    let username: any;

    // Open new dialog window to get the username introduced by user
    if (confirm) username = window.prompt(this.translateSvc.instant('delete.insert-username'));

    // Show snackbar
    if (confirm && (username != this.username) && (username != null) && !this.tokenSvc.isAdmin()) {
      const msg = this.translateSvc.instant('delete.wrong-username')
      this.utilsSvc.showSnackBar(msg, 5000);
      this.dialog.closeAll();
    };

    // Delete account in case the username of the session is the same as the user name entered by the user.
    if ((username === this.username) || this.tokenSvc.isAdmin()) {
      this.uploading = true;
      this.authSvc.deleteAccount(username).subscribe({
        next: resp => {
          this.tokenSvc.logOut();
          const msg = this.translateSvc.instant('delete.account') + ` "${username}" ` + this.translateSvc.instant('delete.canceled');
          this.uploading = false;
          this.dialog.closeAll();
          this.utilsSvc.showSnackBar(msg, 5000);
        },
        error: err => {
          this.utilsSvc.showSnackBar(err.error.message, 5000);
        }
      });
    };
  };

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  cancel() {
    this.dialog.closeAll();
    if (this.data.option === 'deleteImage' && this.data.article != null) {
      this.dialog.open(GalleryImagesComponent, { data: { article: this.data.article } });
    }
    if (this.data.option === 'deleteVideo' && this.data.article != null) {
      this.dialog.open(GalleryVideosComponent, { data: { article: this.data.article } });
    }
  };

}
