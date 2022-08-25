import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http:HttpClient) { }
  
  getWeatherData(cityname: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.weatherApi, {
      headers: new HttpHeaders()
      .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue),
      params: new HttpParams()
      .set('q',cityname)
      // .set('unit', 'metric')
      // .set('mode','json')
    })
  }
}
