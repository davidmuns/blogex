import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  // styleUrls: ['./map-selector.component.css'],
})
export class MapSelectorComponent implements AfterViewInit {
  private map: L.Map | undefined;
  selectedMapType: string = 'osm'; // Tipo de mapa por defecto
  layers: { [key: string]: L.TileLayer } = {};

  ngAfterViewInit() {
    // Inicializar el mapa
    this.map = L.map('map', {
      center: [51.505, -0.09], // Coordenadas iniciales
      zoom: 3,
    });
    

    // Configurar los diferentes tipos de capas
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
  }

  // Cambiar el tipo de mapa según la selección
  onMapTypeChange() {
    if (this.map) {
      // Eliminar todas las capas actuales
      Object.values(this.layers).forEach((layer) => this.map!.removeLayer(layer));

      // Agregar la capa seleccionada
      this.layers[this.selectedMapType].addTo(this.map);
    }
  }
}

