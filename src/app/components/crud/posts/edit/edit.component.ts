import { Toast, ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public editPostForm!: FormGroup;
  public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";
  public article: any = null;
  public image!: File;
  public imageOriginal: any;
  public miniatura!: File;

  constructor(
    private toastrService: ToastrService,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private readonly fBuilder: FormBuilder,
    private readonly router: Router) {
    const navigation = router.getCurrentNavigation();
    this.article = navigation?.extras?.state;
    this.reload();
    this.initForm();
  }

  ngOnInit(): void {
    //Check if there is some image and if not place it
    this.image = this.imageOriginal;
    if (this.imageOriginal !== '') {
      this.imageOriginal = this.article.img1;
    }
    //If the post is not empty, fill the fields of the form
    if (typeof this.article !== 'undefined') {
      this.editPostForm.patchValue(this.article);
    } else {
      this.router.navigate(['admin/new']);
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

  /* moreImgs() {
    if (this.flag < 3) {
      this.flag++;
      this.viewForm.push(this.flag);
      if (this.flag == 3)
        this.buttonTag = "One Less";
    } else {
      this.viewForm.pop(this.flag)
      this.flag--;
      this.buttonTag = "One More";
    }
  } */

  onSubmit(post: Article) {
    this.editPost(post.id, post);
    if (this.image != undefined) {
      this.uploadImage(this.image);
    }
    
    this.router.navigate(['list']);
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
    fr.readAsDataURL(this.image);
  }

}
