import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-language',
  templateUrl: './switch-language.component.html',
  styleUrls: ['./switch-language.component.scss']
})
export class SwitchLanguageComponent implements OnInit {

  urlFlags = {
    catalonia: 'https://rinconhispanico.com/image/cache/catalog/Banderas/1200px-Flag_of_Catalonia.svg-500x500.png',
    spain: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Spain_%28Civil%29.svg/2560px-Flag_of_Spain_%28Civil%29.svg.png',
    england: 'https://upload.wikimedia.org/wikipedia/en/archive/a/ae/20190917170935%21Flag_of_the_United_Kingdom.svg'
  }

  constructor(private translate:TranslateService) {
    // translate.getBrowserLang();
    // translate.addLangs(['ca', 'en', 'es']);
    // translate.setDefaultLang('es');
   }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
