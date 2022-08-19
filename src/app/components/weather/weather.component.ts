import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/model/weather.model';
import { WeatherServiceService } from 'src/app/services/weather-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherService: WeatherServiceService) { }

  weatherData?: WeatherData

  ngOnInit(): void {

  }

  searching(searchcity: string) {
    this.weatherService.getWeatherData(searchcity)
    .subscribe({
      next: (response) => {
        this.weatherData = response
        console.log(response)
      }
    })
  }
}
