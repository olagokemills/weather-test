import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { UtilsService } from '../shared/utils.service';
import { TemperatureData, Weather } from '../model/weather.model';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNonNullData, selectTransformedData, selectDataError, selectDataLoading } from './store/selectors';
import { fetchData } from './store/actions';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  query:string = '';
 WeatherList:Array<Partial<TemperatureData>> = [];
 isLoading:boolean= false;
 errorMessage!:string;


//  data$: Observable<TemperatureData>;
  loading: boolean = false;
  error$: Observable<string>;
  //data$: Observable<TemperatureData[]>;
  data$: Observable<TemperatureData[] | null>;
  constructor(
    private weatherService: WeatherService,
    private utils:UtilsService,
    private store:Store
  ){

    this.data$ = this.store.select(selectTransformedData);
    this.error$ = this.store.select(selectDataError);
  }

  ngOnInit(): void {
    this.store.select(selectDataLoading).subscribe((loading) => {
      this.loading = loading;
    });
  }

  fetchData() {
    if(this.query === '')
    return this.showError('Please type in a city')
    this.store.dispatch(fetchData({param:this.query}));
  }


  searchWeather(){
  if(this.query === '')
  return this.showError('Please type in a city')
    this.isLoading = !this.isLoading
      this.weatherService.getWeatherData(this.query).subscribe(
        res=>{
          this.isLoading = false
          if(res){
            const filterData = this.utils.filerCurrentData(res.list)
            this.WeatherList.push(this.utils.filterTimeAndTemperature(filterData,res.city))
          }
        },
        err=>{
          this.isLoading = false
          this.showError('City not found, please try again')
        }
      )
  }

  showError(data:string){
    this.errorMessage= data
    setTimeout(() => {
      this.errorMessage= ''
    }, 1500);
  }

  
}
