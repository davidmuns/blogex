import { environment } from 'src/environments/environment';
import { Component, HostListener, AfterViewInit, ViewChild, ElementRef, Renderer2, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Map, marker, MarkerClusterGroup, tileLayer } from 'leaflet';
import 'leaflet.markercluster';
import { ArticleService } from './../../shared/services/article.service';
import { Article } from 'src/app/shared/models/article';
import { Router } from '@angular/router';

const BASE_URL = environment.FRONT_BASE_URL;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('capa') toCapa!: ElementRef;
  @ViewChild('map') toMap!: ElementRef;
  @ViewChild('map2') toMap2!: ElementRef;
  @ViewChild('map3') toMap3!: ElementRef;

  @HostListener('document:scroll', ['$event'])
  handleKey(event: any): void {
    this.onScroll()
  }
  @HostListener('window: resize', ['$event'])
  onResize(event: any): void {
    this.innerWidth = event.target.innerWidth;
    this.hideSection = this.innerWidth < 500 ? false : true;
  }

  public catchScroll!: any;
  public postActual!: any;
  public hideSection!: boolean;
  private innerWidth!: any;
  private lat = 42.40249;
  private lon = 2.194332;
  private zoom = 3;

  constructor(
    private router: Router,
    private articleSvc: ArticleService,
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.hideSection = window.innerWidth < 500 ? false : true;
  }

  // Rendering map and popups for each item
  ngAfterViewInit(): void {
    let map: Map;
    let map2: Map;
    let map3: Map;

    if (this.articleSvc.focusArticleOnMap) {
      const lat: any = this.articleSvc.data?.latitude;
      const lon: any = this.articleSvc.data?.longitude;
      map = new Map('map').setView([lat, lon], 13);
      map2 = new Map('map2').setView([lat, lon], 4);
      map3 = new Map('map3').setView([lat, lon], 13);
      this.articleSvc.focusArticleOnMap = false;
    } else {
      map = new Map('map').setView([this.lat, this.lon], this.zoom);
      map2 = new Map('map2').setView([this.lat, this.lon], this.zoom);
      map3 = new Map('map3').setView([this.lat, this.lon], 3);
    }

    //Map1 code
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers1 = new MarkerClusterGroup();
    const markers2 = new MarkerClusterGroup();
    const markers3 = new MarkerClusterGroup();
  
    this.popUpArticlesOnMap(markers1);
    markers1.addTo(map);
    
    //Map2 code
    tileLayer.wms("http://ows.mundialis.de/services/service?", {
      layers: 'Dark',
      maxZoom: 13,
      format: 'image/png',
      transparent: true,
      attribution: "Weather data © 2012 IEM Nexrad"
    }).addTo(map2);

    this.popUpArticlesOnMap(markers2);
    markers2.addTo(map2);
    
    //Map3 code
    tileLayer.wms("http://ows.mundialis.de/services/service?", {
      layers: 'OSM-Overlay-WMS',
      maxZoom: 13,
      format: 'image/png',
      transparent: true,
      attribution: "Weather data © 2012 IEM Nexrad"
    }).addTo(map3);
    
    this.popUpArticlesOnMap(markers3);
    markers3.addTo(map3);
  }

  private popUpArticlesOnMap(markers: MarkerClusterGroup): void{
    this.articleSvc.getAll().subscribe((res: Article[]) => {
      res.forEach(point => {
        this.postActual = point;
        const popupContent = `
          <a href="#" class="article-link" data-id="${point.id}">${point.title}</a>
          <br><br>
          <a href="#" class="article-link" data-id="${point.id}">
            <img class="image-link" src="${point.imagenPortada}" alt="${point.title}">
          </a>
          <br>
          <p class="text">${ point.caption }</p>
        `;
        const popup = marker([point.latitude, point.longitude]).addTo(markers).bindPopup(popupContent);
        popup.on('popupopen', (e) => {
          const popupContainer = e.popup.getElement();
          // Selecciona el enlace del título y la imagen por separado y aplica el evento
          const linkElements = popupContainer?.querySelectorAll('.article-link');
          const imageElement = popupContainer?.querySelector('.image-link');
          // Listener para enlaces
          linkElements?.forEach(link => {
            link.addEventListener('click', (event: Event) => {
              event.preventDefault();
              const id = (event.currentTarget as HTMLElement).getAttribute('data-id');
              if (id) {
                this.router.navigate([`/article/${id}`]);
              }
            });
          });
          // Listener específico para la imagen
          imageElement?.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const id = imageElement.getAttribute('data-id');
            if (id) {
              this.router.navigate([`/article/${id}`]);
            }
          });
        });
      });
    });
  }
  //Click to map and enable zoom
  removeCapa() {
    const asCapa = this.toCapa.nativeElement;
    const asMap1 = this.toMap.nativeElement;
    this.renderer2.setStyle(asCapa, 'display', 'none');
    this.renderer2.setStyle(asMap1, 'zIndex', '0');
  }

  //Double click to map to exit zoom
  outMap() {
    const asCapa = this.toCapa.nativeElement;
    const asMap1 = this.toMap.nativeElement;
    this.renderer2.setStyle(asCapa, 'display', 'block');
    this.renderer2.setStyle(asMap1, 'zIndex', '-2');
  }

  onScroll() {
    this.catchScroll = window.scrollY;
    const asMap1 = this.toMap.nativeElement;
    const asMap2 = this.toMap2.nativeElement;
    const asMap3 = this.toMap3.nativeElement;
    if (this.catchScroll > 0 && this.catchScroll < 800) {
      this.renderer2.setStyle(asMap1, 'display', 'block');
      this.renderer2.setStyle(asMap2, 'display', 'none');
      this.renderer2.setStyle(asMap3, 'display', 'none');
    }
    if (this.catchScroll > 800 && this.catchScroll < 2700) {
      this.renderer2.setStyle(asMap1, 'display', 'none');
      this.renderer2.setStyle(asMap2, 'display', 'block');
      this.renderer2.setStyle(asMap3, 'display', 'none');
    }
    if (this.catchScroll > 2700) {
      this.renderer2.setStyle(asMap1, 'display', 'none');
      this.renderer2.setStyle(asMap2, 'display', 'none');
      this.renderer2.setStyle(asMap3, 'display', 'block');
    }
  }
}
