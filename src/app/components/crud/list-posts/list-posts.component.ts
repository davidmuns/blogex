import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { DeleteComponent } from '../delete/delete.component';

export interface PeriodicElement {
  title: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: "Primer article"},
  {title: "Segon article"},
  {title: "Tercer article"},
  {title: "quart article"},
  {title: "Cinquè article"},
  {title: "Desè article"},
  {title: "Onzè article"}
];

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  displayedColumns: string[] = ['titol', 'borrar'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly router: Router, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event){}
  
  onEdit(post: Article){
    this.navigationExtras.state = post;
    this.router.navigate(['/admin/edit'], this.navigationExtras);
  }

  onDelete(post: any){
    this.dialog.open(DeleteComponent);
  }

}
