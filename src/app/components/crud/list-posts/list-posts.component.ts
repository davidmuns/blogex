import { TokenService } from 'src/app/shared/services/token.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  public articleHtml!: boolean;
  public innerWidth: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('list') asList!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event:any): void{
    this.innerWidth = event.target.innerWidth;
    if(this.innerWidth > 420){
      this.articleHtml = true;
    }else{
      this.articleHtml = false;
    }
  }

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
    this.innerWidth = window.innerWidth;
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
    this.articleSvc.fadeInOut = !this.articleSvc.fadeInOut;
    if(this.showHidePosts == true){
      this.renderer2.setStyle(listPosts, 'height', '1200px');
      this.renderer2.setStyle(listPosts, 'transition', 'all 1s')
    }else{
      this.renderer2.setStyle(listPosts, 'height', '0px');
    }
    
  }
}
