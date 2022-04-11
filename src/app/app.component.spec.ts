import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { TabularFormComponent } from './tabular-form/tabular-form.component';
import { WeatherDataService } from './Services/weather-data.service';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisplayChartComponent } from './display-chart/display-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



});
