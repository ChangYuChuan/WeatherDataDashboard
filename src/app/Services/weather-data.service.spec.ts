import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DatePipe } from  '@angular/common';
import { WeatherDataService } from './weather-data.service';
import { HttpClientModule } from '@angular/common/http/';

describe('WeatherDataService', () => {
  let service: WeatherDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientModule],
      providers: [WeatherDataService,HttpClient,DatePipe] });
    service = TestBed.inject(WeatherDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get weather data from sg gov api', async () => {
    let expectedResponce = {"items":[{"update_timestamp":"2022-01-10T06:02:12+08:00","timestamp":"2022-01-10T05:28:00+08:00","forecasts":[{"temperature":{"low":24,"high":34},"date":"2022-01-11","forecast":"Fair and windy","relative_humidity":{"low":55,"high":85},"wind":{"speed":{"low":15,"high":30},"direction":"NNE"},"timestamp":"2022-01-11T00:00:00+08:00"},{"temperature":{"low":24,"high":34},"date":"2022-01-12","forecast":"Windy. Afternoon passing showers","relative_humidity":{"low":55,"high":85},"wind":{"speed":{"low":15,"high":30},"direction":"NNE"},"timestamp":"2022-01-12T00:00:00+08:00"},{"temperature":{"low":24,"high":33},"date":"2022-01-13","forecast":"Windy. Afternoon passing showers","relative_humidity":{"low":55,"high":90},"wind":{"speed":{"low":20,"high":30},"direction":"NNE"},"timestamp":"2022-01-13T00:00:00+08:00"},{"temperature":{"low":24,"high":33},"date":"2022-01-14","forecast":"Windy. Afternoon passing showers","relative_humidity":{"low":55,"high":90},"wind":{"speed":{"low":20,"high":30},"direction":"NNE"},"timestamp":"2022-01-14T00:00:00+08:00"}]},{"update_timestamp":"2022-01-10T17:32:12+08:00","timestamp":"2022-01-10T17:07:00+08:00","forecasts":[{"temperature":{"low":24,"high":34},"date":"2022-01-11","forecast":"Fair and windy","relative_humidity":{"low":55,"high":85},"wind":{"speed":{"low":15,"high":30},"direction":"NNE"},"timestamp":"2022-01-11T00:00:00+08:00"},{"temperature":{"low":24,"high":34},"date":"2022-01-12","forecast":"Fair and windy","relative_humidity":{"low":55,"high":85},"wind":{"speed":{"low":15,"high":30},"direction":"NNE"},"timestamp":"2022-01-12T00:00:00+08:00"},{"temperature":{"low":24,"high":33},"date":"2022-01-13","forecast":"Windy. Afternoon passing showers","relative_humidity":{"low":55,"high":90},"wind":{"speed":{"low":20,"high":30},"direction":"NNE"},"timestamp":"2022-01-13T00:00:00+08:00"},{"temperature":{"low":24,"high":33},"date":"2022-01-14","forecast":"Windy. Afternoon passing showers","relative_humidity":{"low":55,"high":90},"wind":{"speed":{"low":20,"high":30},"direction":"NNE"},"timestamp":"2022-01-14T00:00:00+08:00"}]}],"api_info":{"status":"healthy"}}; 
    // new Date(year, monthIndex, day). 0 for January to 11 for December
    let result = await service.GetFourDaystWeatherData(new Date(2022,0,10));
    console.log('result',result);
    expect(result).toEqual(expectedResponce);
  });
});
