import { UtilsService } from './../../../../shared/services/utils.service';
import { TinyEditorService } from './../../../../shared/services/tiny-editor.service';
import { environment } from 'src/environments/environment';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { TranslateService } from '@ngx-translate/core';

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
  public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";
  public article: any = null;
  public image!: File;
  public miniatura!: File;
  public articleHtml!: boolean;
  public innerWidth: any;

  constructor(
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
    this.article = navigation?.extras?.state;
    this.reload();
    this.initForm();
  };

  ngOnInit(): void {
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
    this.router.navigate(['admin/new']);
  };

  private initForm(): void {
    this.editPostForm = this.fBuilder.group({
      id: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(60)]],
      //img1: [''],
      alt1: ['', Validators.required],
      text1: ['', Validators.required],
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
          this.router.navigate(['article/' + post.id]);
          this.utilsSvc.showSnackBar("Cover image updated", 5000);
        } else {
          msg = this.translateService.instant('ImgMaximumExceed') + " 5MB";
          this.utilsSvc.showSnackBar(msg, 5000);
        };
      } else {
        this.editPost(post.id, post);
        this.router.navigate(['article/' + post.id]);
      };
    } else {
      msg = this.translateService.instant('FillBlanks');
          this.utilsSvc.showSnackBar(msg, 5000);
    };
  };

  private editPost(id: number, post: Article) {
    if (this.editPostForm.valid) {
      this.articleService.updateArticle(post.id, post).subscribe({
        next: data => {
         this.utilsSvc.showSnackBar(data.mensaje, 5000);
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

  handleImage1(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    };
    if (this.image != null) {
      fr.readAsDataURL(this.image);
    };
  };
};
