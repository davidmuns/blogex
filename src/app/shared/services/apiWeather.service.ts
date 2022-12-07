import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  constructor(private http: HttpClient) { }

   // https://www.youtube.com/watch?v=vpq2FxNzgd4
   getWeather(lat: number, lon: number): Observable<Weather> {
    const apiKey = 'd0047952dfbeb9ec30622425fe11ed84';
    return this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`);
  }
}
