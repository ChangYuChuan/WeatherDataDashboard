import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { TabularFormComponent } from './tabular-form/tabular-form.component';
import { WeatherDataService } from './Services/weather-data.service';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisplayChartComponent } from './display-chart/display-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    TabularFormComponent,
    DisplayChartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    HighchartsChartModule
  ],
  providers: [WeatherDataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
