import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  durationInSeconds = 5;

  constructor(private readonly dialog: MatDialog, 
    private snack: MatSnackBar,
    private readonly articleSvc: ArticleService,
    @Inject(MAT_DIALOG_DATA) public data: {articleId: number},
    private toastr: ToastrService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
  }

  deleteArticle(){
    this.articleSvc.deleteArticle(this.data.articleId).subscribe({
      next: data => {
        this.snack.open("Article deleted", "",
        {duration:  3000});
        //this.redirectTo(this.router.url);
        this.router.navigate(['admin/new']);
      }});
    this.dialog.closeAll();
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

  cancel(){
    this.dialog.closeAll();
  }

}