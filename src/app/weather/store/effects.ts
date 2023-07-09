import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { WeatherService } from '../weather.service';

import { fetchData, fetchDataSuccess, fetchDataFailure, updateWeatherList } from './actions';
import { UtilsService } from 'src/app/shared/utils.service';

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions,
    private dataService: WeatherService,
    private utils: UtilsService
  ) {}

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchData),
      switchMap((action) =>
        this.dataService.getWeatherData(action.param).pipe(
          switchMap((response) => {
            const filterData = this.utils.filerCurrentData(response.list);
            const transformedData = this.utils.filterTimeAndTemperature(filterData, response.city);
            const updatedList = [...this.weatherList, transformedData];

            return [
              fetchDataSuccess({ data: updatedList }),
              updateWeatherList({ list: updatedList }),
            ];
          }),
          catchError((error) => {
            let errorMessage = 'An error occurred. Please try again.';

            if (error.status === 404) {
              errorMessage = 'City not found.';
            }

            return of(fetchDataFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  //weatherList array to maintain the transformed data
  weatherList: any[] = [];
}
