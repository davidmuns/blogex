import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { slider } from './route-animations';
declare let gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slider
  ]
})
export class AppComponent {
  title = 'blogex';
  show: boolean = false;
  starShowing = 500;

  constructor(router: Router) {
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

  // https://www.youtube.com/watch?v=A3zhdTE4anc
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop || 0;

    if (scrollPosition >= this.starShowing) {
      this.show = true;
    } else {
      this.show = false;
    }

  }

  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  // animacion entre páginas
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
