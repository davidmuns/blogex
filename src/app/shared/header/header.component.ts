import { InfoAppComponent } from './../../components/info-app/info-app.component';
import { UtilsService } from './../services/utils.service';
import { LoginComponent } from '../../components/auth/login/login.component';
import { TinyEditorService } from './../services/tiny-editor.service';
import { TranslateService } from '@ngx-translate/core';
import { DeleteComponent } from './../../components/crud/delete/delete.component';
import { TokenService } from './../services/token.service';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private getScreenWidth: any;
  isMobile = false
  isSolid = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      this.isSolid = false; // Header sólido al inicio
    } else if (scrollTop > 0 && scrollTop < 600) {
      this.isSolid = false; // Header transparente entre 0 y 100px de scroll
    } else if (scrollTop >= 600) {
      this.isSolid = true; // Header sólido nuevamente después de 100px
    }
  }
 
  contexts = [
    {
      lang: 'ca',
      flagUrl: 'https://wallpapercave.com/wp/wp2240009.png',
      title: 'Català',
      label: 'Català',
      width: '20',
      height: '20'
    },
    {
      lang: 'es',
      flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png',
      title: 'Español',
      label: 'Español',
      width: '20',
      height: '20'
    },
    {
      lang: 'en',
      flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_the_United_Kingdom_%281-1%29.svg',
      title: 'English',
      label: 'English',
      width: '20',
      height: '20'
    },
  ]

  constructor(
    private readonly utilsSvc: UtilsService,
    private readonly tinyEditorSvc: TinyEditorService,
    private readonly translate: TranslateService,
    public dialog: MatDialog,
    public tokenService: TokenService,
    public router: Router,
    private readonly translateService: TranslateService
  ) {
    translate.getBrowserLang();
    translate.addLangs(['ca', 'en', 'es']);
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.setMobileScreen();
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  }

  onLogout() {
    const msg = `${this.translateService.instant('header.see-you')} ${this.tokenService.getUsername()}!!`;
    this.utilsSvc.showSnackBar(msg, 5000);
    this.tokenService.logOut();
  }

  onDeleteAccount() {
    this.dialog.open(DeleteComponent, {
      data: { option: "deleteAccount" },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  }

  onSwitchLang(lang: string) {
    this.translate.use(lang);
    this.tinyEditorSvc.setLanguageInEditorConfig(lang);
  }

  onHome() {
    this.router.navigate(['home']);
  }

  onHelp() {
    this.dialog.open(InfoAppComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms' 
    });
  }
  // https://www.concretepage.com/angular-material/angular-material-open-menu-on-hover
  openMenu(menuTrigger: MatMenuTrigger) {
    // menuTrigger.openMenu();
  }

  onMyBlog(){
    const uri = '/blog/' + this.tokenService.getUsername();
    this.redirectTo(uri);
  }

  

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setMobileScreen();
  }

  setMobileScreen() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth < 700) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
