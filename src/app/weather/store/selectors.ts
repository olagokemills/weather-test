import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './reducers';
import { Weather, TemperatureData } from '../../model/weather.model';

const getDataState = createFeatureSelector<DataState>('data');

export const selectData = createSelector(getDataState, (state) => state.data);
export const selectDataLoading = createSelector(getDataState, (state) => state.loading);
export const selectDataError = createSelector(
    getDataState,
    (state) => {
      if (state.error === 'NetworkError') {
        return 'A network error occurred. Please check your internet connection.';
      }
      if (state.error === 'InvalidData') {
        return 'Invalid data received. Please try again later.';
      }
      return '';
    }
  );

  

export const selectNonNullData = createSelector(selectData, (data) => data !== null ? data : undefined as unknown as TemperatureData[]);


// Updated selector to select the transformedData property
// export const selectTransformedData = createSelector(
//     selectData,
//     (data: TemperatureData[] | null) => data // Adjust this line based on your transformed data structure
//   );

// export const selectTransformedData = createSelector(
//     selectData,
//     (data: TemperatureData[] | null) => data // Adjust this line based on your transformed data structure
//   );
export const selectTransformedData = createSelector(
    selectData,
    (data) => data as TemperatureData[] | null
  );