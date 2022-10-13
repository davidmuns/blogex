import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('capa') toCapa!: ElementRef;

  constructor(private readonly renderer2: Renderer2, private articleSvc: ArticleService) { }

  ngAfterViewInit(): void {
    const map = new Map('map').setView([42.40249, 2.194332], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.articleSvc.getArticles().subscribe(
      (res: Article[]) => {res.map(point => {
        marker([point.latitude, point.longitude]).addTo(map).bindPopup(`
        <a [routerLink]="['/article', article.id]" target="blank">${point.title}</a>
        <p class="text">${point.text1}</p>
        <img src="${point.img1}">
      `);
      });
      map.fitBounds([
        ...res.map(point => [point.latitude, point.longitude] as [number, number])
      ]);
    });	
  }

  //Click to map and enable zoom
  removeCapa(){
    const asCapa = this.toCapa.nativeElement;
    this.renderer2.setStyle(asCapa, 'width', '0px');
  }

}
