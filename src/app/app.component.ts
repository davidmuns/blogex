import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { slider } from './route-animations';
declare let gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    slider
  ]
})
export class AppComponent {
  title = 'blogex';

  constructor(router: Router){
    // https://youtu.be/Q2RTJxhBLkQ
    // Google analytics
    const navEndEvents$ = router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: any) => {
      gtag('config', 'G-36QJW1606N', {
        'page-path': event.urlAfterRedirects
      });
    });
  }

  onActivate(){
    window.scroll(0, 0);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
