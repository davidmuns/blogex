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
  username: string = this.tokenSvc.getUsername() as string;
  uploading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article, imgId: string, videoId: number, option: string },
    private utilsSvc: UtilsService,
    private tokenSvc: TokenService,
    private authSvc: AuthService,
    private readonly dialog: MatDialog,
    private readonly articleSvc: ArticleService,
    private videoSvc: VideoService,
    private readonly router: Router,
    private translateSvc: TranslateService
  ) { }

  onDeleteArticle() {
    this.uploading = true;
    this.articleSvc.deleteArticle(this.data.article.id).subscribe({
      next: data => {
        this.uploading = false;
        this.utilsSvc.showSnackBar(data.mensaje, 5000);
        this.dialog.closeAll();
        this.redirectTo(this.router.url);
      }
    });
  }

  onDeleteImage() {
    this.uploading = true;
    this.articleSvc.deleteImage(this.data.imgId).subscribe({
      next: (data: any) => {
        this.uploading = false;
        this.dialog.closeAll();
        this.dialog.open(GalleryImagesComponent, { data: { article: this.data.article } });
        this.utilsSvc.showSnackBar(data.mensaje, 5000);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    })
  };

  onDeleteVideo() {
    this.uploading = true;
    this.videoSvc.delete(this.data.videoId).subscribe({
      next: data => {
        this.uploading = false;
        this.dialog.closeAll();
        this.dialog.open(GalleryVideosComponent, { data: { article: this.data.article } });
        this.utilsSvc.showSnackBar(data.mensaje, 5000);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    })
  };

  onDeleteAccount() {
    // Open dialog window before deleting
    const confirm = window.confirm(this.translateSvc.instant('delete.confirm'));
    let username: any;
    
    // Open new dialog window to get the username introduced by user
    if (confirm) username = window.prompt(this.translateSvc.instant('delete.insert-username'));
    
    // Show snackbar in case of confirmation and the user name does not match and the user has not canceled
    if (confirm && username != this.username && username != null) {
      const msg = this.translateSvc.instant('delete.wrong-username')
      this.utilsSvc.showSnackBar(msg, 5000);
    };

    // Delete account in case the username of the session is the same as the user name entered by the user.
    if (username === this.username) {
      this.uploading = true;
      this.authSvc.deleteAccount(this.username).subscribe({
        next: resp => {
          this.tokenSvc.logOut();
          const msg = this.translateSvc.instant('delete.account') + ` "${ username }" ` + this.translateSvc.instant('delete.canceled');
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
  };

}
