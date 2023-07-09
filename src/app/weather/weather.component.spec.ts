import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { StoreModule, Store } from '@ngrx/store';
import { dataReducer } from './store/reducers';
import { fetchData } from './store/actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ data: dataReducer })],
      declarations: [WeatherComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should dispatch fetchData action on initialization', () => {
    const expectedAction = fetchData({ param: 'cityName' });

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  // it('should display loading state while data is being fetched', () => {
  //   component.loading = true;
  //   fixture.detectChanges();

  //   const loadingSpinner = fixture.nativeElement.querySelector('.loading-spinner');
  //   expect(loadingSpinner).toBeTruthy();
  // });

  // it('should display error message when data fetching fails', () => {
  //   const errorMessage = 'An error occurred. Please try again.';
  //   component.error = errorMessage;
  //   fixture.detectChanges();

  //   const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
  //   expect(errorMessageElement.textContent).toContain(errorMessage);
  // });
});
