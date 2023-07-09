import { Component, OnInit } from '@angular/core';
import { TemperatureData } from '../model/weather.model';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTransformedData, selectDataError, selectDataLoading } from './store/selectors';
import { fetchData } from './store/actions';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  query:string = '';
  errorMessage!:string;
  loading: boolean = false;
  error$: Observable<string>;
  data$: Observable<TemperatureData[] | null>;
  constructor(
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

  showError(data:string){
    this.errorMessage= data
    setTimeout(() => {
      this.errorMessage= ''
    }, 1500);
  }

  
}
