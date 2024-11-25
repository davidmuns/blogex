import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Map, marker, MarkerClusterGroup, tileLayer } from 'leaflet';
import { Article } from 'src/app/shared/models/article';
import 'leaflet.markercluster';
import L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit {
  @ViewChild('capa') toCapa!: ElementRef;
  @ViewChild('map') toMap!: ElementRef;
  @HostListener('document:scroll', ['$event'])
  handleKey(event: any): void {
    this.onScroll()
  }
  public catchScroll!: any;
  public postActual!: any;
  private readonly lat = 42.40249;
  private readonly lon = 2.194332;
  private readonly zoom = 3;
  selectedMapType: string = 'osm'; // Tipo de mapa por defecto
  private map: L.Map | undefined;
  layers: { [key: string]: L.TileLayer } = {};

  // Cambiar el tipo de mapa según la selección
  onMapTypeChange() {
    if (this.map) {
      // Eliminar todas las capas actuales
      Object.values(this.layers).forEach((layer) => this.map!.removeLayer(layer));

      // Agregar la capa seleccionada
      this.layers[this.selectedMapType].addTo(this.map);
    }
  }

  constructor(
    private readonly router: Router,
    private readonly articleSvc: ArticleService,
    private readonly renderer2: Renderer2
  ) { }

  // Rendering map and popups for each item
  ngAfterViewInit(): void {
    if (this.articleSvc.focusArticleOnMap) {
      const lat: any = this.articleSvc.data?.latitude;
      const lon: any = this.articleSvc.data?.longitude;
      this.map = new Map('map').setView([lat, lon], 13);
      this.articleSvc.focusArticleOnMap = false;
    } else {
      this.map = new Map('map').setView([this.lat, this.lon], this.zoom);
    }

    this.layers = {
      osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }),
      satellite: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
        layers: 'Dark',
        maxZoom: 13,
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
      }),
      terrain: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
        layers: 'OSM-Overlay-WMS',
        maxZoom: 13,
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
      }),
      geography: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
        layers: 'TOPO-OSM-WMS',
        maxZoom: 13,
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
      }),
    };

    // Agregar la capa inicial
    this.layers['osm'].addTo(this.map);

    const markers1 = new MarkerClusterGroup();
   
  
    this.popUpArticlesOnMap(markers1);
    markers1.addTo(this.map);
  
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
    // const asMap2 = this.toMap2.nativeElement;
    // const asMap3 = this.toMap3.nativeElement;
    if (this.catchScroll > 0 && this.catchScroll < 800) {
      this.renderer2.setStyle(asMap1, 'display', 'block');
      // this.renderer2.setStyle(asMap2, 'display', 'none');
      // this.renderer2.setStyle(asMap3, 'display', 'none');
    }
    if (this.catchScroll > 800 && this.catchScroll < 2700) {
      this.renderer2.setStyle(asMap1, 'display', 'none');
      // this.renderer2.setStyle(asMap2, 'display', 'block');
      // this.renderer2.setStyle(asMap3, 'display', 'none');
    }
    if (this.catchScroll > 2700) {
      this.renderer2.setStyle(asMap1, 'display', 'none');
      // this.renderer2.setStyle(asMap2, 'display', 'none');
      // this.renderer2.setStyle(asMap3, 'display', 'block');
    }
  }

}
