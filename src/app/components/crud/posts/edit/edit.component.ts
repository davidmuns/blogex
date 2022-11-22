import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast, ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void{
    this.innerWidth = event.target.innerWidth;
    if(this.innerWidth > 420){
      this.articleHtml = true;
    }else{
      this.articleHtml = false;
    }
  }

  public editPostForm!: FormGroup;
  public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";
  public article: any = null;
  public image!: File;
  //public imageOriginal: any;
  public miniatura!: File;
  public articleHtml!: boolean;
  public innerWidth: any;

  constructor(
    private toastrService: ToastrService,
    private articleService: ArticleService,
    private snack: MatSnackBar,
    private readonly fBuilder: FormBuilder,
    private readonly router: Router,
    private translateService: TranslateService) {
    const navigation = router.getCurrentNavigation();
    this.article = navigation?.extras?.state;
    this.reload();
    this.initForm();
  }

  ngOnInit(): void {
    //Check if there is some image and if not place it
    // this.image = this.imageOriginal;
    // if (this.imageOriginal !== '') {
    //   this.imageOriginal = this.article.img1;
    // }
    //If the post is not empty, fill the fields of the form
    if (typeof this.article !== 'undefined') {
      this.editPostForm.patchValue(this.article);
    } else {
      this.router.navigate(['admin/new']);
    }
    
    this.innerWidth = window.innerWidth;
    if(this.innerWidth > 420){
      this.articleHtml = true;
    }else{
      this.articleHtml = false;
    }
  }

  //Reload the page to bring more forms
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  toNew() {
    this.router.navigate(['admin/new']);
  }

  private initForm(): void {
    this.editPostForm = this.fBuilder.group({
      id: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(60)]],
      img1: [''],
      alt1: ['', Validators.required],
      text1: ['', Validators.required],
      img2: [''],
      alt2: [''],
      text2: [''],
      img3: [''],
      alt3: [''],
      text3: [''],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    })
  }

  onSubmit(post: Article) {
    if(this.editPostForm.valid){
      if (this.image != undefined) {
        if(this.image.size <= environment.IMG_MAX_SIZE){
          this.editPost(post.id, post);
          this.uploadImage(this.image);
          this.router.navigate(['article/'+ post.id]);
          this.snack.open("Cover image updated.", "", { duration: 5000 });
        }else{
          this.snack.open(this.translateService.instant('ImgMaximumExceed') + " 2MB", "", { duration: 5000 });
        }
      }else{
        this.editPost(post.id, post);
        this.router.navigate(['article/'+ post.id]);
        //this.router.navigate(['list']);
      } 
    }else{
      this.snack.open(this.translateService.instant('FillBlanks'), "", { duration: 3000 });
    } 
  }

  private editPost(id: number, post: Article) {
    if(this.editPostForm.valid){
      this.articleService.updateArticle(post.id, post).subscribe({
        next: data => {
          this.toastrService.success(data.mensaje, '', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        },
        error: err => {
          this.toastrService.error(err.error.mensaje, '', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      })
    }
  }

  private uploadImage(image: File) {
    this.articleService.uploadImage(image).subscribe({
      next: data => {
        // this.toastrService.success(data.mensaje, '', {
        //   timeOut: 1000, positionClass: 'toast-top-center'
        // });
      },
      error: err => {
        this.toastrService.error(err.error.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    })
  }

  handleImage1(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    }
    if(this.image != null){
      fr.readAsDataURL(this.image);
    }
    
  }

}
