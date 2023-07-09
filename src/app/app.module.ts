import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dataReducer } from './weather/store/reducers';
import { DataEffects } from './weather/store/effects';

import { KelvinToCelsiusPipe } from './shared/kelvintoCelsius.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    KelvinToCelsiusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ data: dataReducer }),
    EffectsModule.forRoot([DataEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

