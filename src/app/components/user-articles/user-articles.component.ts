import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  private username!: string;
  public articles!: Article[];
  public pageSizeOptions: number[] = [1];
  public pageSize: number = 1;
  public pageNumber: number = 1;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly articleSvc: ArticleService
    ) { }

  ngOnInit(): void {
    this.getAllArticlesByUsername();
  }

  private getAllArticlesByUsername(){
    this.username = this.activatedRoute.snapshot.paramMap.get('username') as string;

    this.articleSvc.getArticlesByUsername(this.username).subscribe(
      (data: Article[]) => {
        this.articles = data
      }
    )
  }

  onPageChange(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex +1;
  }

  /* public getServerData(event?:PageEvent){
    this.articleSvc.getAll().subscribe(
      response =>{
        if(response.error) {
          // handle error
        } else {
          this.datasource = response.data;
          this.pageIndex = response.pageIndex;
          this.pageSize = response.pageSize;
          this.length = response.length;
        }
      },
      error =>{
        // handle error
      }
    );
    return event;
  } */

}
