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
  miniatura!: File;
  uploading = false;
  public newPostForm!: FormGroup;
  public flag: number = 1;
  public buttonTag: string = "One More";
  // tinymce text editor config variable
  editorConfig: any;
  tags: string[] = [];
  separatorKeysCodes = [13, 188];

  constructor(
    tinyEditorSvc: TinyEditorService,
    private readonly utilsSvc: UtilsService,
    private readonly fBuilder: FormBuilder,
    private readonly tokenService: TokenService,
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly translateSvc: TranslateService
  ) {
    this.initForm();
    tinyEditorSvc.getEditorConfig().subscribe((config: any) => {
      this.editorConfig = config;
    });
  }

  private initForm(): void {
    this.newPostForm = this.fBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      caption: ['', [Validators.required, Validators.maxLength(50)]],
      tags: [[]],
      content: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  };

  // Función para agregar etiquetas
  addTag(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    // Limpiar el input después de agregar la etiqueta
    if (input) {
      input.value = '';
    }
  }

  // Función para eliminar etiquetas
  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }  
  }

  handleImageOnNewForm(event: any): void {

    this.image = event.target.files[0];
    if (!this.image?.type?.startsWith('image/')) {
      let msg = this.translateSvc.instant('crud.article-card.valid-img');
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
        if ((img.height > img.width) || (img.height == img.width)) {
          let msg = this.translateSvc.instant('crud.article-card.cover-img-orientation');
          this.utilsSvc.showSnackBar(msg, 5000);
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
    if (post.tags) {
      post.tags = this.tags.map(tag => ({ name: tag }));
    }   
    console.log(post);
    
    if (this.newPostForm.valid && this.image != null) {
      if (this.image.size <= environment.IMG_MAX_SIZE) {
        const username = this.tokenService.getUsername() as string;
        this.createArticle(post, username, this.image);
      } else {
        msg = this.translateSvc.instant('ImgMaximumExceed') + " 5MB";
        this.utilsSvc.showSnackBar(msg, 3000);
      }
    } else {
      msg = this.translateSvc.instant('FillBlanks');
      this.utilsSvc.showSnackBar(msg, 3000);
    };
  };

  private createArticle(post: Article, username: string, img: File) {
    this.uploading = true;
    let msg = '';
    if (this.newPostForm.valid) {
      this.articleService.createArticle(post, username, img).subscribe({
        next: data => {
          this.uploading = false;
          msg = this.translateSvc.instant('crud.new.ok');
          this.utilsSvc.showSnackBar(msg, 3000);
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
