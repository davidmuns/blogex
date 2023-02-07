import { UtilsService } from './../../../../shared/services/utils.service';
import { TinyEditorService } from './../../../../shared/services/tiny-editor.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ArticleService } from './../../../../shared/services/article.service';
import { TokenService } from './../../../../shared/services/token.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  image!: File;
  images: File[] = [];
  miniatura!: File;

  public newPostForm!: FormGroup;
  public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";
  // tinymce text editor config variable
  editorConfig: any;

  constructor(
    tinyEditorSvc: TinyEditorService,
    private utilsSvc: UtilsService,
    private readonly fBuilder: FormBuilder,
    private tokenService: TokenService,
    private articleService: ArticleService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.initForm();
    tinyEditorSvc.getEditorConfig().subscribe((config: any) => {
      this.editorConfig = config;
    });
  }

  private initForm(): void {
    this.newPostForm = this.fBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      img1: ['', Validators.required],
      alt1: ['', Validators.required],
      text1: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  };

  handleImage(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    };
    if (this.image != null) {
      fr.readAsDataURL(this.image);
    };
  };

  onSubmit(post: Article) {
    let msg = '';
    if (this.newPostForm.valid) {
      if (this.image.size <= environment.IMG_MAX_SIZE) {
        const username = this.tokenService.getUsername() as string;
        this.createArticle(post, username);
        this.uploadImage(this.image);

      } else {
        msg = this.translateService.instant('ImgMaximumExceed') + " 3MB";
        this.utilsSvc.showSnackBar(msg, 3000);
      }
    } else {
      msg = this.translateService.instant('FillBlanks');
      this.utilsSvc.showSnackBar(msg, 3000);
    };
  };

  private uploadImage(image: File) {
    this.articleService.uploadImage(image).subscribe({
      error: err => {
        const msg = this.translateService.instant('ImgMaximumExceed') + " 3MB";
        this.utilsSvc.showSnackBar(msg, 3000);
      }
    });
  };

  private createArticle(post: Article, username: string) {
    if (this.newPostForm.valid) {
      this.articleService.createArticle(post, username).subscribe({
        next: data => {
          this.utilsSvc.showSnackBar(data.mensaje, 3000);
          this.redirectTo(this.router.url);
        },
        error: err => {
          this.utilsSvc.showSnackBar(err.error.mensaje, 3000);
        }
      });
    };
  };

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  };

};
