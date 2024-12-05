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

  image!: File | null;
  images: File[] = [];
  miniatura!: File;
  uploading = false;

  public newPostForm!: FormGroup;
  // public viewForm: any = [1];
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
      caption: ['', Validators.required],
      content: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  };

  // handleImageOnNewForm(event: any) {
  //   this.image = event.target.files[0];

  //    if (!this.image?.type?.startsWith('image/')) {
  //     let msg = this.translateService.instant('crud.article-card.valid-img');
  //     this.utilsSvc.showSnackBar(msg, 3000);
  //     event.target.value = '';
  //     return;
  //   }
  //   const fr = new FileReader();
  //   fr.onload = (e: any) => {
  //     this.miniatura = e.target.result;
  //   };
  //   if (this.image != null) {
  //     fr.readAsDataURL(this.image);
  //   };
  // };

  handleImageOnNewForm(event: any): void {
    
    this.image = event.target.files[0];
    if (!this.image?.type?.startsWith('image/')) {
      let msg = this.translateService.instant('crud.article-card.valid-img');
      this.utilsSvc.showSnackBar(msg, 3000);
      this.image = null;
      event.target.value = null;
      return;
    }
    const img = new Image();
    const fr = new FileReader();
    // Leer y verificar orientación
    fr.onload = (e: any) => {
      img.src = e.target.result;
      img.onload = () => {
        if (img.height > img.width) {
          let msg = this.translateService.instant('crud.article-card.cover-img-orientation');
          this.utilsSvc.showSnackBar(msg, 3000);
          this.image = null;
          event.target.value = null;
          return;
        }
        // Asignar miniatura si la orientación es válida
        this.miniatura = e.target.result;
      };
      
    };
    fr.readAsDataURL(this.image);
  }

  onSubmit(post: Article) { 
    let msg = '';
    console.log(post);
    
    if (this.newPostForm.valid && this.image != null) {
      if (this.image.size <= environment.IMG_MAX_SIZE) {
        const username = this.tokenService.getUsername() as string;
        this.createArticle(post, username, this.image);
      } else {
        msg = this.translateService.instant('ImgMaximumExceed') + " 5MB";
        this.utilsSvc.showSnackBar(msg, 3000);
      }
    } else {
      msg = this.translateService.instant('FillBlanks');
      this.utilsSvc.showSnackBar(msg, 3000);
    };
  };

  private createArticle(post: Article, username: string, img: File) {
    this.uploading = true;
    if (this.newPostForm.valid) {
      this.articleService.createArticle(post, username, img).subscribe({
        next: data => {
          this.uploading = false;
          this.utilsSvc.showSnackBar(data.mensaje, 3000);
          this.redirectTo(this.router.url);
        },
        error: err => {
          this.uploading = false;
          this.utilsSvc.showSnackBar(err.error.message, 5000);
        }
      });
    };
  };

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  };

};
