import { TokenService } from './../services/token.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/Auth/login/login.component';
import { SignupComponent } from 'src/app/components/Auth/signup/signup.component';
import { Router } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public validation: boolean = false;
  public articles: Article[] = [];
  public hideUsername: boolean = false;

  constructor(
    public dialog: MatDialog,
    public tokenService: TokenService,
    public router: Router,
    private readonly articleSvc: ArticleService
  ) { }

  ngOnInit(): void {
    this.getArticles();
    if(window.screen.width < 360){
      this.hideUsername = true;
    }else{
      this.hideUsername = false;
    }
  }

  private getArticles() {
    this.articleSvc.getAll().subscribe({
      next: data => {
        this.articles = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }
  signupDialog() {
    this.dialog.open(SignupComponent);
  }

  onLogout(){
    this.tokenService.logOut();
  }

}