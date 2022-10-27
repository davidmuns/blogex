import { TokenService } from 'src/app/shared/services/token.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';
import { DeleteComponent } from '../delete/delete.component';
import { transition } from '@angular/animations';

export interface PeriodicElement {
  title: string
}

/* const ELEMENT_DATA: PeriodicElement[] = [
  {title: "Primer article"},
  {title: "Segon article"},
  {title: "Tercer article"},
  {title: "quart article"},
  {title: "Cinquè article"},
  {title: "Desè article"},
  {title: "Onzè article"}
]; */

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

  showHidePosts: boolean = false;
  displayedColumns: string[] = ['titol', 'borrar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('list') asList!: ElementRef;

  constructor(
    private tokenService: TokenService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly articleSvc: ArticleService,
    private readonly renderer2: Renderer2
    ) { }

  ngOnInit(): void {
    const username =this.tokenService.getUsername() as string;
    this.articleSvc.getArticlesByUsername(username).subscribe(posts => this.dataSource.data = posts);
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Send all the post
  onEdit(post: Article){
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
    this.toList();
  }

  onDelete(post: Article){
    this.dialog.open(DeleteComponent, {data: {articleId: `${post.id}`}});
  }

  toList(){
    const listPosts = this.asList.nativeElement;
    this.showHidePosts = !this.showHidePosts;
    if(this.showHidePosts == true){
      this.renderer2.setStyle(listPosts, 'height', '100vh');
      this.renderer2.setStyle(listPosts, 'transition', 'all 1s')

    }else{
      this.renderer2.setStyle(listPosts, 'height', '0vh');
    }
    
  }
}
