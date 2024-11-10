import { UtilsService } from './../../../../shared/services/utils.service';
import { Video } from './../../../../shared/models/video';
import { VideoService } from './../../../../shared/services/video.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Article } from 'src/app/shared/models/article';
import { DeleteComponent } from '../../delete/delete.component';
import { Imagen } from 'src/app/shared/models/imagen';
import { environment } from 'src/environments/environment';

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
  file!: File;
  miniatura!: Imagen;
  videoUrl: string = 'C:/Users/LENOVO/Desktop/videos/1a561ab1-81d7-4981-9eea-41a089011197-Video de WhatsApp 2024-11-04 a las 13.34.13_c687393c.mp4'

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

  handleImage(event: any) {
    this.file = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    }
    if (this.file != null) {
      fr.readAsDataURL(this.file);
    }
  };

  onUpload() {
    if (this.file != undefined) {
      if (this.file.size < environment.IMG_MAX_SIZE) {
        this.addVideo(this.file, this.data.article.id);
      } else {
        const size = environment.IMG_MAX_SIZE / 1000000;
        const msg = this.translateService.instant('ImgMaximumExceed') + " " +  size + "MB";
        this.utilsSvc.showSnackBar(msg, 5000);
      }
    } else {
      const msg = this.translateService.instant('PleaseSelectImage');
      this.utilsSvc.showSnackBar(msg, 5000);
    };
  };

  private addVideo(file: File, articleId: number) {
    this.videoSvc.save(file, articleId).subscribe({
      next: data => {
        this.utilsSvc.showSnackBar(data.mensaje, 3000);
        this.videos = [];
        this.getVideos();
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.message, 5000);
      }
    });
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

  onDelete(id: number | undefined) {
    this.dialog.open(DeleteComponent, { data: { videoId: id, article: this.article, option: "deleteVideo" } });
  };
};
