import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { circleMarker, Map, marker, tileLayer } from 'leaflet';

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

    const cibernarium = marker([41.40255199258423, 2.1943192116804253]).addTo(map);
    const encants = circleMarker([41.401148768731595, 2.186451453721548], {
      radius: 14,
      color: "#370909",
      weight: 2,
      fillOpacity: 0.3,
      fillColor: "red"
    }).addTo(map);
    const ramblaPobleNou = marker([41.40241224163785, 2.1994655318120153]).addTo(map);

    map.fitBounds([
      [cibernarium.getLatLng().lat, cibernarium.getLatLng().lng],
      [encants.getLatLng().lat, encants.getLatLng().lng],
      [ramblaPobleNou.getLatLng().lat, ramblaPobleNou.getLatLng().lng]
    ]);
  }

  removeCapa(){
    const asCapa = this.toCapa.nativeElement;
    this.renderer2.setStyle(asCapa, 'width', '0px');
  }

}
