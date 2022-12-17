import { Component, HostListener, AfterViewInit, ViewChild, ElementRef, Renderer2, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Map, marker, MarkerClusterGroup, tileLayer } from 'leaflet';
import  'leaflet.markercluster';
import { Router } from '@angular/router';
import { ArticleService } from './../../shared/services/article.service';
import { Article } from 'src/app/shared/models/article';

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
  onResize(event: any): void{
    this.innerWidth = event.target.innerWidth;
    this.innerWidth < 500 ? this.hideSection = false : this.hideSection = true;
  }

  public catchScroll!: any;
  public postActual!: any;
  public hideSection!: boolean;
  private innerWidth!: any;

  constructor(
    private articleSvc: ArticleService,
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    window.innerWidth < 500 ? this.hideSection = false : this.hideSection = true;
  }

  ngAfterViewInit(): void {

    const map = new Map('map').setView([41.40249, 2.194332], 4);
    const map2 = new Map('map2').setView([42.40249, 2.194332], 5);
    const map3 = new Map('map3').setView([42.40249, 2.194332], 13);

    //Map1 code
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers1 = new MarkerClusterGroup();
    const markers2 = new MarkerClusterGroup();
    const markers3 = new MarkerClusterGroup();

    this.articleSvc.getAll().subscribe(
      (res: Article[]) => {
        res.map(point => {
          this.postActual = point;
          marker([point.latitude, point.longitude]).addTo(markers1).bindPopup(`
        <a href="https://blogex.netlify.app/article/${point.id}">${point.title}</a>
        <p class="text">${point.text1}</p>
        <a href="https://blogex.netlify.app/article/${point.id}"><img src="${point.imagenPortada}"></a>
      `);
        });
        /* map.fitBounds([
          ...res.map(point => [point.latitude, point.longitude] as [number, number])
        ]); */
      });

      markers1.addTo(map);

    //Map2 code
    tileLayer.wms("http://ows.mundialis.de/services/service?", {
      layers: 'Dark',
      maxZoom: 13,
      format: 'image/png',
      transparent: true,
      attribution: "Weather data © 2012 IEM Nexrad"
    }).addTo(map2);

    this.articleSvc.getAll().subscribe(
      (res: Article[]) => {
        res.map(point => {
          this.postActual = point;
          marker([point.latitude, point.longitude]).addTo(markers2).bindPopup(`
        <a href="https://blogex.netlify.app/article/${point.id}">${point.title}</a>
        <p class="text">${point.text1}</p>
        <a href="https://blogex.netlify.app/article/${point.id}"><img src="${point.imagenPortada}"></a>
      `);
        });
        /* map2.fitBounds([
          ...res.map(point => [point.latitude, point.longitude] as [number, number])
        ]); */
      });
      markers2.addTo(map2);

    //Map3 code
    tileLayer.wms("http://ows.mundialis.de/services/service?", {
      layers: 'OSM-Overlay-WMS',
      maxZoom: 13,
      format: 'image/png',
      transparent: true,
      attribution: "Weather data © 2012 IEM Nexrad"
    }).addTo(map3);

    this.articleSvc.getAll().subscribe(
      (res: Article[]) => {
        res.map(point => {
          this.postActual = point;
          marker([point.latitude, point.longitude]).addTo(markers3).bindPopup(`
        <a href="https://blogex.netlify.app/article/${point.id}">${point.title}</a>
        <p class="text">${point.text1}</p>
        <a href="https://blogex.netlify.app/article/${point.id}"><img src="${point.imagenPortada}" class="imgMap"></a>
      `);
        });
        map3.fitBounds([
          ...res.map(point => [point.latitude, point.longitude] as [number, number])
        ]);
      });
      markers3.addTo(map3);
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
    //console.log("CatchScroll: ", this.catchScroll);

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
