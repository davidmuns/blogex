import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blogex';

  constructor(public translate: TranslateService){
    translate.getBrowserLang();
    translate.addLangs(['en', 'es', 'ca']);
    translate.setDefaultLang('ca');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
