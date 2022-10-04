import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  durationInSeconds = 5;

  constructor(private readonly dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  deleteArticle(){
    this.dialog.closeAll();
    this.snack.open("Article deleted", "",
    {duration:  3000});
  }

  cancel(){
    this.dialog.closeAll();
  }

}