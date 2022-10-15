import { Article } from 'src/app/shared/models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from './../../../../shared/services/article.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-temp',
  templateUrl: './edit-temp.component.html',
  styleUrls: ['./edit-temp.component.scss']
})
export class EditTempComponent implements OnInit {
  editForm!: FormGroup;
  hide: boolean = true;
  article!: Article;

  constructor(
    private readonly fBuilder: FormBuilder,
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getArticle();
  }

  private initForm():void{
    this.editForm = this.fBuilder.group({
      title:['', Validators.required],
      img1:['', Validators.required],
      alt1:['', Validators.required],
      text1:['', Validators.required],
      img2:[''],
      alt2:[''],
      text2:[''],
      img3:[''],
      alt3:[''],
      text3:[''],
      longitude:['', Validators.required],
      latitude:['', Validators.required]
    })
  }

  private getArticle(){
    const articleId = Number(this.activatedRoute.snapshot.paramMap.get('articleid'));
    this.articleService.getArticle(articleId).subscribe({
      next: data => {
        this.article = data;
      },
      error: err => {
        this.toastrService.error(err.error.mensaje, '', {
          timeOut: 3000,  positionClass: 'toast-top-center',

        });
      }
    })

  }

  onSubmit(article: Article){
    const articleId = Number(this.activatedRoute.snapshot.paramMap.get('articleid'));
    this.articleService.updateArticle(articleId, article).subscribe({
      next: data => {
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      this.router.navigate(['list']);
      },
      error: err => {
        this.toastrService.error(err.error.mensaje, '', {
          timeOut: 3000,  positionClass: 'toast-top-center',

        });
      }
    })
    
  }

}
