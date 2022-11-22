import { GalleryUserComponent } from './../../../shared/GalleryUser/GalleryUser.component';
import { Imagen } from './../../../shared/models/imagen';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  durationInSeconds = 5;

  constructor(private readonly dialog: MatDialog,
    private toastrService: ToastrService,
    private snack: MatSnackBar,
    private readonly articleSvc: ArticleService,
    @Inject(MAT_DIALOG_DATA) public data: { articleId: number, imgId: string, option: string },
    private readonly router: Router
  ) { }

  ngOnInit(): void {}

  onDeleteArticle() {
    this.articleSvc.deleteArticle(this.data.articleId).subscribe({
      next: data => {
        this.snack.open("Article deleted", "",
          { duration: 3000 });
        this.redirectTo(this.router.url);
        // this.router.navigate(['admin/new']);
      }
    });
    this.dialog.closeAll();
  }

  onDeleteImage() {
    this.articleSvc.deleteImage(this.data.imgId).subscribe({
      next: (data: any) => {
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        //this.redirectTo(this.router.url);
        //window.location.reload();
        this.dialog.closeAll();
        this.dialog.open(GalleryUserComponent, { data: { articleId: this.data.articleId } });
      },
      error: err => {
        console.log(err);
      }
    })
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  cancel() {
    this.dialog.closeAll();
  }

}
