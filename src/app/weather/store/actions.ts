import { createAction, props } from '@ngrx/store';
import { TemperatureData } from '../../model/weather.model';

export const fetchData = createAction('[Data] Fetch Data', props<{ param: string }>());
export const fetchDataSuccess = createAction(
  '[Data] Fetch Data Success',
  props<{ data: TemperatureData[] }>()
);
export const fetchDataFailure = createAction('[Data] Fetch Data Failure', props<{ error: string }>());


export const updateWeatherList = createAction(
    '[Data] Update Weather List',
    props<{ list: any[] }>()
  );