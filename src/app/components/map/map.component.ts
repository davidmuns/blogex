import { environment } from 'src/environments/environment';
import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

const BASE_URL = environment.FRONT_BASE_URL;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() valueScroll: any;
  @ViewChild('capa') toCapa!: ElementRef;
  @ViewChild('map') mapa1!: ElementRef;
  @ViewChild('map2') mapa2!: ElementRef;
  @ViewChild('map3') mapa3!: ElementRef;

  private postActual!: any;

  constructor(private readonly renderer2: Renderer2,
    private articleSvc: ArticleService) { }

  ngAfterViewInit(): void {

    this.onScroll();

    const map = new Map('map').setView([42.40249, 2.194332], 13);
    const map2 = new Map('map2').setView([42.40249, 2.194332], 13);
   
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    tileLayer.wms("http://ows.mundialis.de/services/service?", {
      layers: 'Dark',
      maxZoom: 13,
      format: 'image/png',
      transparent: true,
      attribution: "Weather data © 2012 IEM Nexrad"
    }).addTo(map2);

    this.articleSvc.getAll().subscribe(
      (res: Article[]) => {
        res.forEach(point => {
          this.postActual = point;
          marker([point.latitude, point.longitude]).addTo(map2).bindPopup(`
          <a href="${BASE_URL}article/${point.id}">${point.title}</a>
          <p class="text">${point.text1}</p>
          <img src="${point.imagenPortada}" (mouseover)="initWindow(${point.id})">
        `);
        });
        map2.fitBounds([
          ...res.map(point => [point.latitude, point.longitude] as [number, number])
        ]);
      });

  }

  //Click to map and enable zoom
  removeCapa() {
    const asCapa = this.toCapa.nativeElement;
    this.renderer2.setStyle(asCapa, 'width', '0px');
    this.renderer2.setStyle(asCapa, 'width', '0px');
  }

  onScroll() {
    console.log("Scroll: ", this.valueScroll);
    this.valueScroll = window.scrollY;
    const asMap1 = this.mapa1.nativeElement;
    const asMap2 = this.mapa2.nativeElement;
    const asMap3 = this.mapa3.nativeElement;
    if (this.valueScroll > 300 && this.valueScroll < 600) {
      this.renderer2.setStyle(asMap1, 'display', 'none');
      this.renderer2.setStyle(asMap2, 'display', 'block');
      this.renderer2.setStyle(asMap3, 'display', 'none');
    }
    if (this.valueScroll > 600) {
      this.renderer2.setStyle(asMap1, 'display', 'none');
      this.renderer2.setStyle(asMap2, 'display', 'none');
      this.renderer2.setStyle(asMap3, 'display', 'block');
    }
  }

}
