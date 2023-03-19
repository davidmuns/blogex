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
    spain: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Spain_%28Civil%29.svg/2560px-Flag_of_Spain_%28Civil%29.svg.png',
    england: 'https://upload.wikimedia.org/wikipedia/en/archive/a/ae/20190917170935%21Flag_of_the_United_Kingdom.svg'
  }

  constructor(
    private utilsSvc: UtilsService,
    private tinyEditorSvc: TinyEditorService,
    private translate: TranslateService,
    public dialog: MatDialog,
    public tokenService: TokenService,
    public router: Router
  ) {
    translate.getBrowserLang();
    translate.addLangs(['ca', 'en', 'es']);
    translate.setDefaultLang('ca');
  }

  openLogin() {
    this.dialog.open(LoginComponent);
  }

  onLogout() {
    const msg = `Hasta pronto ${this.tokenService.getUsername()}!!`;
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

  // https://www.concretepage.com/angular-material/angular-material-open-menu-on-hover
  openMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }
}