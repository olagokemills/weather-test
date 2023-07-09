import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig }  from '../../assets/config';
import { Weather } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor( 
    private http: HttpClient,
  ) { }

  apiUrl = 'https://api.openweathermap.org/data/2.5/forecast'

  getWeatherData(data:string) {
    const params = {
      q:data,
      appid:AppConfig.appID
    };
    return this.http.get<Weather>(this.apiUrl, { params });
  }
}


