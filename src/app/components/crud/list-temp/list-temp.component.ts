import { AddImageComponent } from './../posts/add-image/add-image.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from './../../../shared/services/article.service';
import { TokenService } from './../../../shared/services/token.service';
import { Article } from './../../../shared/models/article';
import { Component, OnInit } from '@angular/core';
import { Imagen } from 'src/app/shared/models/imagen';

@Component({
  selector: 'app-list-temp',
  templateUrl: './list-temp.component.html',
  styleUrls: ['./list-temp.component.scss']
})
export class ListTempComponent implements OnInit {
  articles: Article[] = [];
  imagenes: Imagen[] = [];
  // showImgs: boolean = false;
  
  constructor(
    private readonly dialog: MatDialog,
    private tokenService: TokenService,
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllArticlesByUsername();
  }

  private getAllArticlesByUsername() {
    const username = this.tokenService.getUsername() as string;
    this.articleService.getArticlesByUsername(username).subscribe({
      next: (data: Article[]) => {
        this.articles = data; 
        this.articles.forEach(article => {
          this.getImgsByArticleId(article.id);        
        });    
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  // onImgs(articleId: number) {
  //   this.showImgs = !this.showImgs;
  //   this.getImgsByArticleId(articleId);
  // }

  private getImgsByArticleId(id: number) {
    this.articleService.getImagesByArticleId(id).subscribe({
      next: (data: Imagen[]) => {
        data.forEach(img => {   
          this.imagenes.push(img);
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // onDeleteArticle(articleId: number) {
  //   this.articleService.deleteArticle(articleId).subscribe({
  //     next: data => {
  //       this.toastrService.success(data.mensaje, '', {
  //         timeOut: 3000, positionClass: 'toast-top-center'
  //       });
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   })
  // }

  onDeleteImage(imgId: string){
    this.articleService.deleteImage(imgId).subscribe({
      next: (data: any) => {
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
