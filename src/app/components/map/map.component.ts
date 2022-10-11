import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { ArticleJson } from '../../../assets/articles';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('capa') toCapa!: ElementRef;

  constructor(private readonly renderer2: Renderer2) { }

  ngAfterViewInit(): void {
    const map = new Map('map').setView([42.40249, 2.194332], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    ArticleJson.map(point => {
      marker([point.latitude, point.longitude]).addTo(map).bindPopup(`
        <h5>${point.title}</h5>
        <img src="${point.img1}">
      `);
    })

    const cibernarium = marker([41.40255199258423, 2.1943192116804253]).addTo(map);
    const encants = marker([41.401148768731595, 2.186451453721548]).addTo(map);
    const ramblaPobleNou = marker([41.40241224163785, 2.1994655318120153]).addTo(map);

    map.fitBounds([
      ...ArticleJson.map(point => [point.latitude, point.longitude] as [number, number]),
      [cibernarium.getLatLng().lat, cibernarium.getLatLng().lng],
      [encants.getLatLng().lat, encants.getLatLng().lng],
      [ramblaPobleNou.getLatLng().lat, ramblaPobleNou.getLatLng().lng]
    ]);
  }

  //Click to map and enable zoom
  removeCapa(){
    const asCapa = this.toCapa.nativeElement;
    this.renderer2.setStyle(asCapa, 'width', '0px');
  }

}
