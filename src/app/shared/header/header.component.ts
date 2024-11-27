import { InfoAppComponent } from './../../components/info-app/info-app.component';
import { UtilsService } from './../services/utils.service';
import { LoginComponent } from '../../components/auth/login/login.component';
import { TinyEditorService } from './../services/tiny-editor.service';
import { TranslateService } from '@ngx-translate/core';
import { DeleteComponent } from './../../components/crud/delete/delete.component';
import { TokenService } from './../services/token.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  urlFlags = {
    catalonia: 'https://wallpapercave.com/wp/wp2240009.png',
    spain: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png',
    england: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_the_United_Kingdom_%281-1%29.svg'
  }

  constructor(
    private utilsSvc: UtilsService,
    private tinyEditorSvc: TinyEditorService,
    private translate: TranslateService,
    public dialog: MatDialog,
    public tokenService: TokenService,
    public router: Router,
    private translateService: TranslateService
  ) {
    translate.getBrowserLang();
    translate.addLangs(['ca', 'en', 'es']);
    translate.setDefaultLang('es');
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      enterAnimationDuration: '1000ms'
    });
  }

  onLogout() {
    const msg = `${this.translateService.instant('header.see-you')} ${this.tokenService.getUsername()}!!`;
    this.utilsSvc.showSnackBar(msg, 5000);
    this.tokenService.logOut();
  }

  onDeleteAccount() {
    this.dialog.open(DeleteComponent, { data: { option: "deleteAccount" } });
  }

  onSwitchLang(lang: string) {
    this.translate.use(lang);
    this.tinyEditorSvc.setLanguageInEditorConfig(lang);
  }

  onHome() {
    this.router.navigate(['home']);
  }

  onHelp(){
    this.dialog.open(InfoAppComponent);
  }
  // https://www.concretepage.com/angular-material/angular-material-open-menu-on-hover
  openMenu(menuTrigger: MatMenuTrigger) {
    // menuTrigger.openMenu();
  }
}
