import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  tiempo: any;

  constructor(private httpClient: HttpClient) { }

  // public getWeather(): Observable<any> {
  //   const apiKey = 'd0047952dfbeb9ec30622425fe11ed84';
  //   return this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${41.77970438505784}&lon=${3.0441483949242727}&appid=${apiKey}&units=metric&lang=es`);
  // }

  // public getWeather(lat: number, lon: number): any {
  //   const apiKey = 'd0047952dfbeb9ec30622425fe11ed84';
    
  //   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`)
  //     .then(resp => resp.json())
  //     .then(
  //       data => {
  //         this.tiempo = data;
          
  //       }
  //     )
  //     console.log(this.tiempo);
      
  //     return this.tiempo;
  // }

}
