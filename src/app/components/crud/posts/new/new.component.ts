import { ToastrService } from 'ngx-toastr';
import { ArticleService } from './../../../../shared/services/article.service';
import { TokenService } from './../../../../shared/services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit{

  public newPostForm!: FormGroup;
  public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";
  articles: Article[] = [];

  constructor(
    private readonly fBuilder: FormBuilder,
    private tokenService: TokenService,
    private articleService: ArticleService,
    private toastrService: ToastrService
    ) { 
    this.initForm();
  }

  private initForm():void{
    this.newPostForm = this.fBuilder.group({
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

  ngOnInit(): void { 
  }

  moreImgs(){
    if(this.flag < 3){
      this.flag++;
      this.viewForm.push(this.flag);
      if(this.flag == 3)
        this.buttonTag = "One Less";
    }else{
      this.viewForm.pop(this.flag)
      this.flag--;
      this.buttonTag = "One More";
    }
  }

  newPost(post: Article){
    console.log(post);
    const username = this.tokenService.getUsername() as string;
    console.log(username);
    
    this.articleService.createArticle(post, username).subscribe({
      next: data => {
        console.log(data.mensaje);
        this.toastrService.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.getAllArticlesByUsername();
      },
      error: err => {
        console.log(err);
        this.toastrService.error(err.error.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
      }
      
    });   
  }

  private getAllArticlesByUsername(){
    const username = this.tokenService.getUsername() as string;
    this.articleService.getAll(username).subscribe({
      next: data => {
        this.articles = data;
      },
      error: err => {
        console.log(err);
        
      }
    })

  }

  handleImage1(image:any){}

}
