import { Subscription } from 'rxjs';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Map, marker, MarkerClusterGroup } from 'leaflet';
import { Article } from 'src/app/shared/models/article';
import 'leaflet.markercluster';
import L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('capa') toCapa!: ElementRef;
  @ViewChild('map') toMap!: ElementRef;


  public postActual!: any;
  private readonly lat = 42.40249;
  private readonly lon = 2.194332;
  private readonly zoom = 3;
  private layers: { [key: string]: L.TileLayer } = {};
  private article: Article | undefined = undefined;
  subscription: Subscription | null = null;

  constructor(
    private readonly router: Router,
    private readonly articleSvc: ArticleService,
    private readonly renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.subscription = this.articleSvc.article$.subscribe(article => this.article = article);
  }

  // Rendering map and popups for each item
  ngAfterViewInit(): void {
    let map: Map;
    this.layers = {
      map1: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '© OpenStreetMap contributors',
      }),
      map2: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
        layers: 'Dark',
        maxZoom: 14,
        minZoom: 1,
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
      }),
      map3: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
        layers: 'OSM-Overlay-WMS',
        maxZoom: 14,
        minZoom: 1,
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
      }),
      // map4: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
      //   layers: 'TOPO-OSM-WMS',
      //   maxZoom: 13,
      //   format: 'image/png',
      //   transparent: true,
      //   attribution: "Weather data © 2012 IEM Nexrad"
      // }),
      map4: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        minZoom: 1,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }),
      map5: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        minZoom: 1,
        attribution: '&copy; OpenStreetMap contributors, Tiles courtesy of OpenTopoMap.org'
      }),
    };
    if (this.article) {
      const lat: any = this.article.latitude;
      const lon: any = this.article.longitude;
      map = new Map('map').setView([lat, lon], 16);
      this.layers['map4'].addTo(map);
      this.articleSvc.setArticleSubject(undefined);
    } else {
      map = new Map('map').setView([this.lat, this.lon], this.zoom);
    }
    // https://leafletjs.com/examples/wms/wms.html
    L.control.layers(this.layers).addTo(map);
    // Agregar la capa inicial
    this.layers['map1'].addTo(map);
    const markers = new MarkerClusterGroup();
    this.popUpArticlesOnMap(markers);
    markers.addTo(map);

  }

  private popUpArticlesOnMap(markers: MarkerClusterGroup): void {
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
          <p class="text">${point.caption}</p>
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

  ngOnDestroy(): void {
    if (this.subscription) {
      // console.log("SUBSCRIPTION => ", this.subscription);
      this.subscription.unsubscribe();
      this.subscription = null; // Limpieza adicional
    }
  }
}
