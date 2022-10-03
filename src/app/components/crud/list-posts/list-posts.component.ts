import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';

/* export interface PeriodicElement {
  titol: string
} */

const ELEMENT_DATA: any[] = [
  {title: "Primer article", alt1: "Imatge del primer article", text1: "Aquest és el tex, una mica més llarg del primer article"},
  {title: "Segon article", alt1: "Imatge del primer article", text1: "Aquest és el tex, una mica més llarg del primer article"},
  {title: "Tercer article", alt1: "Imatge del primer article", text1: "Aquest és el tex, una mica més llarg del primer article"},
  {title: "quart article", alt1: "Imatge del primer article", text1: "Aquest és el tex, una mica més llarg del primer article"},
  {title: "quart article", alt1: "Imatge del primer article", text1: "Aquest és el tex, una mica més llarg del primer article"},
  {title: "Desè article", alt1: "Imatge del primer article", text1: "Aquest és el tex, una mica més llarg del primer article"},
  {title: "Onzè article", alt1: "Imatge del primer article", text1: "Aquest és el tex, una mica més llarg del primer article"}
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

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event){}
  
  onEdit(post: any){
    this.navigationExtras.state = post;
    this.router.navigate(['/admin/edit'], this.navigationExtras);
  }

  onDelete(post: any){}

}
