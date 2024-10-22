import { UtilsService } from './../../../../shared/services/utils.service';
import { Video } from './../../../../shared/models/video';
import { VideoService } from './../../../../shared/services/video.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Article } from 'src/app/shared/models/article';
import { DeleteComponent } from '../../delete/delete.component';

@Component({
  selector: 'app-gallery-videos',
  templateUrl: './gallery-videos.component.html',
  styleUrls: ['./gallery-videos.component.scss']
})
export class GalleryVideosComponent implements OnInit {

  urlForm = this.fb.group({ url: ['', Validators.required] });
  article = this.data.article;
  articleId = this.article.id;
  playerVars = { controls: 1 };
  youtubeId = '';
  videos: Video[] = [];
  video!: Video;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article },
    private utilsSvc: UtilsService,
    public videoSvc: VideoService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private translateService: TranslateService) { };

  ngOnInit() {
    this.getVideos();
  };

  onSubmit(data: any) {
    const isValidUrl = this.videoSvc.isValidUrl(data.url);
    if (isValidUrl) {
      this.youtubeId = this.videoSvc.getYoutubeId(data.url);
      this.newVideo();
      this.getVideos();
    } else {
      const msg = this.translateService.instant('crud.list-videos.invalid-url');
      this.utilsSvc.showSnackBar(msg, 3000);
    }
  };

  private getVideos() {
    this.videoSvc.getAllByArticleId(this.articleId).subscribe({
      next: (data: Video[]) => {
        this.videos = data;
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 3000);
      }
    })
  };

  private newVideo() {
    this.video = { youtubeId: this.youtubeId, article: this.article }
    this.videoSvc.save(this.video).subscribe({
      next: data => {
        const msg = this.translateService.instant('crud.list-videos.posted');
        this.utilsSvc.showSnackBar(msg, 3000);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 3000);
      }
    })
  };

  onDelete(id: number | undefined) {
    this.dialog.open(DeleteComponent, { data: { videoId: id, article: this.article, option: "deleteVideo" } });
  };
};
