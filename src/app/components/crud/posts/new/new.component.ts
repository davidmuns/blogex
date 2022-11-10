import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from './../../../../shared/services/article.service';
import { TokenService } from './../../../../shared/services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  image!: File;
  images: File[] = [];
  miniatura!: File;

  public newPostForm!: FormGroup;
  public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";

  constructor(
    private snack: MatSnackBar,
    private readonly fBuilder: FormBuilder,
    private tokenService: TokenService,
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.newPostForm = this.fBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      img1: ['', Validators.required],
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

  ngOnInit(): void {
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

  handleImage(event: any) {
    this.image = event.target.files[0];
    //this.images.push(this.image);
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    }
    fr.readAsDataURL(this.image);
  }

  // onSubmit(post: Article) {
  //   const username = this.tokenService.getUsername() as string;
  //   this.createArticle(post, username);
  //   this.images.forEach((img: File) => {
  //     this.uploadImage(img);
  //   })
  // }

  // onSubmit(post: Article) {
  //   const username = this.tokenService.getUsername() as string;
  //   this.createArticle(post, username);
  //   this.images.forEach((img: File) => {
  //     this.uploadImage(img);
  //   })
  // }

  onSubmit(post: Article) {
    if (this.image.size <= environment.IMG_MAX_SIZE) {
      const username = this.tokenService.getUsername() as string;
      this.createArticle(post, username);
      this.uploadImage(this.image);

    }else{
      this.snack.open("Image exceeds its maximum permitted size of 2MB", "",
      { duration: 3000 });
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
        this.toastrService.error('Image exceeds its maximum permitted size of 1MB', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    })
  }

  private createArticle(post: Article, username: string) {
    if (this.newPostForm.valid) {
      this.articleService.createArticle(post, username).subscribe({
        next: data => {
          this.toastrService.success(data.mensaje, '', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.redirectTo(this.router.url);
        },
        error: err => {
          this.toastrService.error(err.error.mensaje, '', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        }
      });
    } else {
      // this.toastrService.error(this.newPostForm.errors?.['required'] + " needs to be completed", '', {
      this.toastrService.error("Please fill the blanks.", '', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
