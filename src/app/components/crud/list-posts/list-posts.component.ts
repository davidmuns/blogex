import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  titol: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {titol: "Primer article"},
  {titol: "Segon article"},
  {titol: "Tercer article"},
  {titol: "quart article"},
  {titol: "quart article"},
  {titol: "Desè article"},
  {titol: "Onzè article"}
];

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  displayedColumns: string[] = ['titol', 'borrar'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event){}
  
  onEdit(post: any){}

  onDelete(post: any){}

}
