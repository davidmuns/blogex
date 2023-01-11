import { Video } from './../../../../shared/models/video';
import { VideoService } from './../../../../shared/services/video.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';
import { DeleteComponent } from '../../delete/delete.component';

@Component({
  selector: 'app-gallery-videos',
  templateUrl: './gallery-videos.component.html',
  styleUrls: ['./gallery-videos.component.scss']
})
export class GalleryVideosComponent implements OnInit {

  urlForm!: FormGroup;
  article$!: Observable<Article>;
  username!: string;
  playerVars = {
    cc_lang_pref: 'es'
  }
  youtubeId = '';
  videos: Video[] = [];
  video!: Video;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article },
    public videoSvc: VideoService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private snack: MatSnackBar,
    private articleSvc: ArticleService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private router: Router) { }

  ngOnInit() {
    this.initform();
    this.getVideos();
    this.getArticle();
  }

  private initform(): void {
    this.urlForm = this.fb.group({
      url: ['', Validators.required]
    })
  }
  onSubmit(data: any) {
    const isValidUrl = this.videoSvc.isValidUrl(data.url);
    if (isValidUrl) {
      this.youtubeId = this.videoSvc.getYoutubeId(data.url);
      this.newVideo();
      this.getVideos();
    } else {
      this.snack.open(this.translateService.instant('crud.list-videos.invalid-url'), "", { duration: 5000 });
    }
  }

  private getArticle() {
    this.article$ = this.articleSvc.getArticle(this.data.article.id);
  }

  private getVideos() {
    this.videoSvc.getAllbyArticleId(this.data.article.id).subscribe({
      next: (data: Video[]) => {
        this.videos = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  private newVideo() {
    this.video = { youtubeId: this.youtubeId, article: this.data.article }
    this.videoSvc.save(this.video).subscribe({
      next: data => {
        console.log(data);
        this.snack.open(this.translateService.instant('crud.list-videos.posted'), "", { duration: 5000 });
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onDelete(id: number | undefined) {
    this.dialog.open(DeleteComponent, { data: { videoId: id, article: this.data.article, option: "deleteVideo" } });
  }

}
