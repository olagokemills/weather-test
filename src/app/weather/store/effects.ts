// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { WeatherService } from '../weather.service';
// import { fetchData, fetchDataSuccess, fetchDataFailure } from './actions';
// import { UtilsService } from 'src/app/shared/utils.service';

// import { TemperatureData, Weather } from '../../model/weather.model';

// @Injectable()
// export class DataEffects {

//  weatherList:Array<TemperatureData> = [];
    
//   fetchData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(fetchData),
//       mergeMap((action) =>
//         this.dataService.getWeatherData(action.param).pipe(      
//             map((response) => {
//                 const filterData = this.utils.filerCurrentData(response.list)
//                 this.weatherList.push(this.utils.filterTimeAndTemperature(filterData,response.city))
//                 // Dispatch the success action with the transformed data
//                 return fetchDataSuccess({ data: this.weatherList });
//               }),
//           catchError((error) => {
//             let errorMessage = 'An error occurred. Please try again.';

//             if (error.status === 404) {
//               errorMessage = 'City not found.';
//             }

//             return of(fetchDataFailure({ error: errorMessage }));
//           })
//         )
//       )
//     )
//   );

  

  

//   constructor(private actions$: Actions, private dataService: WeatherService, private utils:UtilsService) {}
// }




import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
//import { fetchData, fetchDataSuccess, fetchDataFailure } from './actions';
import { WeatherService } from '../weather.service';
//import { UtilsService } from './utils.service';

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
            console.log(transformedData)
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

//   updateWeatherList$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(updateWeatherList),
//       tap((action) => {
//         // Update the weatherList array in the state with the provided list
//         this.weatherList = action.list;
//       })
//     ),
//     { dispatch: false }
//   );

  // Define the weatherList array to maintain the transformed data
  weatherList: any[] = [];
}
