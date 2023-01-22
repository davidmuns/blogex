import { TinyEditorService } from './../services/tiny-editor.service';
import { TranslateService } from '@ngx-translate/core';
import { DeleteComponent } from './../../components/crud/delete/delete.component';
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

  urlFlags = {
    catalonia: 'https://rinconhispanico.com/image/cache/catalog/Banderas/1200px-Flag_of_Catalonia.svg-500x500.png',
    spain: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Spain_%28Civil%29.svg/2560px-Flag_of_Spain_%28Civil%29.svg.png',
    england: 'https://upload.wikimedia.org/wikipedia/en/archive/a/ae/20190917170935%21Flag_of_the_United_Kingdom.svg'
  }
  public validation: boolean = false;
  public articles: Article[] = [];
  public hideUsername: boolean = false;
  logged: boolean = false;

  constructor(
    private tinyEditorSvc: TinyEditorService,
    private translate: TranslateService,
    public dialog: MatDialog,
    public tokenService: TokenService,
    public router: Router,
    private readonly articleSvc: ArticleService
  ) {
    translate.getBrowserLang();
    translate.addLangs(['ca', 'en', 'es']);
    translate.setDefaultLang('ca');
  }

  ngOnInit(): void {
    this.getArticles();
    if (window.screen.width < 750) {
      this.hideUsername = true;
    } else {
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

  onLogout() {
    this.tokenService.logOut();
  }

  onDeleteAccount() {
    this.dialog.open(DeleteComponent, { data: { option: "deleteAccount" } });
  }

  onSwitchLang(lang: string) {
    this.translate.use(lang);
    this.tinyEditorSvc.setLanguageInEditorConfig(lang);
  }

}