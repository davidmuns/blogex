import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Map, marker, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('capa') toCapa!: ElementRef;

  private postActual!: any;

  constructor(private readonly renderer2: Renderer2,
     private articleSvc: ArticleService,
     private router: Router) { }

  ngAfterViewInit(): void {
    const map = new Map('map').setView([42.40249, 2.194332], 13);
    const map2 = new Map('map2').setView([42.40249, 2.194332], 13);
    const map3 = new Map('map3').setView([42.40249, 2.194332], 13);

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
      (res: Article[]) => {res.map(point => {
        this.postActual = point;
        marker([point.latitude, point.longitude]).addTo(map).bindPopup(`
        <a href="http://localhost:4200/article/${point.id}">${point.title}</a>
        <p class="text">${point.text1}</p>
        <img src="${point.imagenPortada}" (mouseover)="initWindow(${point.id})">
      `);
      });
      map.fitBounds([
        ...res.map(point => [point.latitude, point.longitude] as [number, number])
      ]);
    });

    this.articleSvc.getAll().subscribe(
      (res: Article[]) => {res.map(point => {
        this.postActual = point;
        marker([point.latitude, point.longitude]).addTo(map2).bindPopup(`
        <a href="http://localhost:4200/article/${point.id}">${point.title}</a>
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
  removeCapa(){
    const asCapa = this.toCapa.nativeElement;
    this.renderer2.setStyle(asCapa, 'width', '0px');
    this.renderer2.setStyle(asCapa, 'width', '0px');
  }

}
