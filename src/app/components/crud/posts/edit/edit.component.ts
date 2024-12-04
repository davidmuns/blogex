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
  // public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";
  public article: any = null;
  public image!: File | null;
  public miniatura!: File;
  public articleHtml!: boolean;
  public innerWidth: any;
  uploading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { article: Article },
    private readonly dialog: MatDialog,
    private utilsSvc: UtilsService,
    tinyEditorSvc: TinyEditorService,
    private articleService: ArticleService,
    private readonly fBuilder: FormBuilder,
    private readonly router: Router,
    private translateService: TranslateService) {
    tinyEditorSvc.getEditorConfig().subscribe((config:any) => {
      this.editorConfig = config;
    });
    const navigation = router.getCurrentNavigation();
    this.article = data.article;
    this.reload();
    this.initForm();
  };

  ngOnInit(): void {
    console.log(this.data);
    
    if (typeof this.article !== 'undefined') {
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
    this.router.navigate(['group-form']);
    this.dialog.closeAll();
  };

  private initForm(): void {
    this.editPostForm = this.fBuilder.group({
      id: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(60)]],
      //img1: [''],
      caption: ['', Validators.required],
      content: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  };

  onSubmit(post: Article) {
    let msg = '';
    if (this.editPostForm.valid) {
      if (this.image != undefined) {  
        if (this.image.size <= environment.IMG_MAX_SIZE) {
          this.editPost(post.id, post);
          this.uploadImage(this.image);
          // this.router.navigate(['article/' + post.id]);
          // this.utilsSvc.showSnackBar("Cover image updated", 5000);
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
    this.uploading = true;
    if (this.editPostForm.valid) {
      this.articleService.updateArticle(post.id, post).subscribe({
        next: data => {
          setTimeout(() => { 
            this.router.navigate(['article/' + post.id]);
            this.uploading = false;
            this.dialog.closeAll();
            msg = this.translateService.instant('crud.edit.ok');
            this.utilsSvc.showSnackBar(msg, 3000);
          }, 3000);     
        },
        error: err => {
          this.utilsSvc.showSnackBar(err.error.mensaje, 5000);
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

  // handleImageOriginal(event: any) {
  //   this.image = event.target.files[0];
  //   const fr = new FileReader();
  //   fr.onload = (e: any) => {
  //     this.miniatura = e.target.result;
  //   };
  //   if (this.image != null) {
  //     fr.readAsDataURL(this.image);
  //   };
  // };

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
