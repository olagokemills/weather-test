import { createReducer, on } from '@ngrx/store';
import { Weather, TemperatureData } from '../../model/weather.model';
import { fetchData, fetchDataSuccess, fetchDataFailure } from './actions';

export interface DataState {
  data: TemperatureData[]; // Array to store transformed data
  loading: boolean;
  error: string | null;
}

export const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const dataReducer = createReducer(
  initialState,
  on(fetchData, (state) => ({ ...state, loading: true, error: null })),
  on(fetchDataSuccess, (state, { data }) => ({ ...state, data: [...state.data, ...data], loading: false })),
  on(fetchDataFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
