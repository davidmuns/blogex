import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from './../../../shared/services/article.service';
import { TokenService } from './../../../shared/services/token.service';
import { Article } from './../../../shared/models/article';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Imagen } from 'src/app/shared/models/imagen';
import { GalleryUserComponent } from './../../../shared/GalleryUser/GalleryUser.component';

@Component({
  selector: 'app-list-temp',
  templateUrl: './list-temp.component.html',
  styleUrls: ['./list-temp.component.scss']
})
export class ListTempComponent implements OnInit {

  @ViewChild('topPage') topPage!: ElementRef;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  articles: Article[] = [];
  imagenes: Imagen[] = [];
  imgsByArticleId: Imagen[] = [];
  image!: File;
  miniatura!: Imagen;
  username!: string;
  @Input('articleId') articleId!: number;
  indice!: number;
  openArticleGallery: boolean = false;

  constructor(
    private readonly dialog: MatDialog,
    public tokenService: TokenService,
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getAllArticlesByUsername();
    this.articles = [];
  }

  private getAllArticlesByUsername() {
    this.username = this.tokenService.getUsername() as string;
    if (!this.tokenService.isLogged()) {
      this.username = this.activatedRoute.snapshot.paramMap.get('username') as string;
    }

    this.articleService.getArticlesByUsername(this.username).subscribe({
      next: (data: Article[]) => {
        this.articles = data;
        // this.articles.forEach(article => {
        //   this.getImgsByArticleId(article.id);
        // });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  showGallery(id: number | undefined) {
    this.articleId = id as number;
    this.openArticleGallery = true;
    
    
    this.getImgsByArticleId(this.articleId);

  }

  private getImgsByArticleId(id: number) {
    this.articleService.getImagesByArticleId(id).subscribe({
      next: (data: Imagen[]) => {
        this.imagenes = data;
      }
    })
  }
  getIndex(index: number) {
    this.indice = index;
    console.log('index: ', this.indice);

  }
 
  onOpenGallery(id: number) {
    this.dialog.open(GalleryUserComponent, { data: { articleId: `${id}` } });
  }

  onEdit(post: Article) {
    this.navigationExtras.state = post;
    this.router.navigate(['admin/edit'], this.navigationExtras);
  }

  goTopPage(){
    this.topPage.nativeElement.scrollTop = 0;
  }

  hideGallery(){
    this.imagenes = [];
  }
 
}
