import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from './../../../shared/services/article.service';
import { TokenService } from './../../../shared/services/token.service';
import { Article } from './../../../shared/models/article';
import { Component, OnInit } from '@angular/core';
import { Imagen } from 'src/app/shared/models/imagen';
import { GalleryUserComponent } from './../../../shared/GalleryUser/GalleryUser.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-temp',
  templateUrl: './list-temp.component.html',
  styleUrls: ['./list-temp.component.scss']
})
export class ListTempComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  articles: Article[] = [];
  imagenes: Imagen[] = [];
  imgsByArticleId: Imagen[] = [];
  image!: File;
  miniatura!: Imagen;
  username!: string;
  articleId!: number;
  public pageSizeOptions: number[] = [1, 3, 5];
  public pageSize: number = 1;
  public pageNumber: number = 1;
  isAdmin: boolean = false;

  constructor(
    private readonly dialog: MatDialog,
    private tokenService: TokenService,
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.isAdmin =this.tokenService.isAdmin();
    if(this.isAdmin){
      this.getAllArticles();
    }else{
      this.getAllArticlesByUsername();
    }
    this.articles = [];
  }

  onPageChange(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex +1;
  }

  private getAllArticles(){
    this.articleService.getAll().subscribe({
      next: (data: Article[]) => {
        this.articles = data;
        // this.articles.forEach(article => {
        //   this.getImgsByArticleId(article.id);
        // });
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  private getAllArticlesByUsername() {
    this.username = this.tokenService.getUsername() as string;
    this.articleService.getArticlesByUsername(this.username).subscribe({
      next: (data: Article[]) => {
        this.articles = data;
        // this.articles.forEach(article => {
        //   this.getImgsByArticleId(article.id);
        // });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  // private getImgsByArticleId(id: number) {
  //   this.articleService.getImagesByArticleId(id).subscribe({
  //     next: (data: Imagen[]) => {
  //       data.forEach(img => {
  //         this.imagenes.push(img);
  //       })
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   })
  // }

  // onDeleteImage(imgId: string) {
  //   this.articleService.deleteImage(imgId).subscribe({
  //     next: (data: any) => {
  //       this.toastrService.success(data.mensaje, '', {
  //         timeOut: 3000, positionClass: 'toast-top-center'
  //       });
  //       this.redirectTo(this.router.url);
  //       window.location.reload();
  //       this.imagenes = [];
  //       this.getImgsByArticleId(this.articleId);
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   })
  // }

  // redirectTo(uri: string) {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  //     this.router.navigate([uri]));
  // }

  onOpenGallery(id: number) {
    this.dialog.open(GalleryUserComponent, { data: { articleId: id } });
    // this.articleId = id;
    // this.imgsByArticleId = [];
    // this.imagenes.forEach(img => {
    //   if (img.articleId == this.articleId) {
    //     this.imgsByArticleId.push(img);
    //   }
    // })
  }

  onEdit(post: Article){
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  }
  // handleImage(event: any) {
  //   this.image = event.target.files[0];
  //   const fr = new FileReader();
  //   fr.onload = (e: any) => {
  //     this.miniatura = e.target.result;
  //   }
  //   fr.readAsDataURL(this.image);
  // }

  // onAddImg() {
  //   if (this.image != undefined) {
  //     this.addImage(this.image, this.articleId);
  //   } else {
  //     this.toastrService.error('Please select an image.', '', {
  //       timeOut: 3000, positionClass: 'toast-top-center'
  //     });
  //   }

  // }
  // private addImage(image: File, articleId: number) {
  //   this.articleService.addImageToArticle(image, articleId).subscribe({
  //     next: data => {
  //       this.toastrService.success(data.mensaje, '', {
  //         timeOut: 3000, positionClass: 'toast-top-center'
  //       });
  //       this.imagenes = [];
  //       // this.getImgsByArticleId(this.articleId);
  //       //this.redirectTo(this.router.url);
  //     },
  //     error: err => {
  //       this.toastrService.error(err.error.mensaje, '', {
  //         timeOut: 3000, positionClass: 'toast-top-center'
  //       });
  //     }
  //   })

  // }
}
