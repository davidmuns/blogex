import { UtilsService } from './../../../../shared/services/utils.service';
import { TinyEditorService } from './../../../../shared/services/tiny-editor.service';
import { environment } from 'src/environments/environment';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth > 420) {
      this.articleHtml = true;
    } else {
      this.articleHtml = false;
    };
  };

  // tinymce text editor config variable
  editorConfig: any;
  public editPostForm!: FormGroup;
  public flag: number = 1;
  public buttonTag: string = "One More";
  public article: any = null;
  public image!: File | null;
  public miniatura!: File;
  public articleHtml!: boolean;
  public innerWidth: any;
  timeout = 600;
  tags: string[] = [];
  separatorKeysCodes = [13, 188];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article },
    private readonly dialog: MatDialog,
    private readonly utilsSvc: UtilsService,
    tinyEditorSvc: TinyEditorService,
    private readonly articleService: ArticleService,
    private readonly fBuilder: FormBuilder,
    private readonly router: Router,
    private readonly translateService: TranslateService) {
    tinyEditorSvc.getEditorConfig().subscribe((config:any) => {
      this.editorConfig = config;
    });
    this.article = data.article;
    this.reload();
    this.initForm();
  };

  ngOnInit(): void {
    if (typeof this.article !== 'undefined') {
      // Cargar las etiquetas del artículo en el formulario
      if (this.article.tags) {
        this.tags = this.article.tags.map((tag: { id: number, name: string }) => tag.name);  // Solo los nombres
      }   
      this.editPostForm.patchValue(this.article);
    } else {
      this.router.navigate(['admin/new']);
    };

    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 420) {
      this.articleHtml = true;
    } else {
      this.articleHtml = false;
    };
  };

  //Reload the page to bring more forms
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  };

  toNew() {
    this.dialog.closeAll();
    setTimeout(() => { 
      this.router.navigate(['group-form']);
    }, this.timeout); 
  };

  private initForm(): void {
    this.editPostForm = this.fBuilder.group({
      id: ['', Validators.required],
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
    console.log(this.tags);
    
  }

  onSubmit(post: Article) {
    let msg = '';
    if (post.tags) {
      post.tags = this.tags.map(tag => ({ name: tag }));
    }
    console.log(post);
    if (this.editPostForm.valid) {
      if (this.image != undefined) {  
        if (this.image.size <= environment.IMG_MAX_SIZE) {
          this.editPost(post.id, post);
          this.uploadImage(this.image);
        } else {
          msg = this.translateService.instant('ImgMaximumExceed') + " 10MB";
          this.utilsSvc.showSnackBar(msg, 5000);
        };
      } else {
        this.editPost(post.id, post);
      };
    } else {
      msg = this.translateService.instant('FillBlanks');
          this.utilsSvc.showSnackBar(msg, 5000);
    };
  };

  private editPost(id: number, post: Article) {
    let msg = '';
    if (this.editPostForm.valid) {
      this.articleService.updateArticle(post.id, post).subscribe({
        next: data => {
          this.dialog.closeAll();
          setTimeout(() => { 
            this.router.navigate(['article/' + post.id]);
            msg = this.translateService.instant('crud.edit.ok');
            this.utilsSvc.showSnackBar(msg, 3000);
          }, this.timeout);     
        },
        error: err => {
          this.dialog.closeAll();
          this.utilsSvc.showSnackBar(err.error.message, 5000);
        }
      });
    };
  };

  private uploadImage(image: File) {
    this.articleService.uploadImage(image).subscribe({
      error: err => {
        this.utilsSvc.showSnackBar(err.error.mensaje, 5000);
      }
    });
  };

  handleImageOnEditForm(event: any): void {
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
};
