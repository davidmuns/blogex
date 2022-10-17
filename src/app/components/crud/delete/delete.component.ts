import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    @Inject(MAT_DIALOG_DATA) public data: {name: number}
    ) { }

  ngOnInit(): void {
  }

  deleteArticle(){
    this.articleSvc.deleteArticle(this.data.name);
    this.dialog.closeAll();
    this.snack.open("Article deleted", "",
    {duration:  3000});
    console.log("Delete: ", this.data.name)
  }

  cancel(){
    this.dialog.closeAll();
  }

}