import { Component, OnInit } from '@angular/core';
import { WeatherData } from './model/weather.model';
import { WeatherServiceService } from './service/weather-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){ }
  title = 'App'
}
