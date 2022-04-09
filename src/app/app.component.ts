import { Component } from '@angular/core';
import { ISingleHumidTempData } from './Models/isingle-humidity-temperature-data';
import {
  ISgGovWeatherData,
  IForecastWeatherData,
} from './Models/iweather-data';
import { WeatherDataService } from './Services/weather-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  weatherData: ISingleHumidTempData[] = [];
  startDateString: string = '';
  today: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  breakLoop: boolean = false;
  constructor(
    private weatherSrv: WeatherDataService,
    private datePipe: DatePipe
  ) {}
  /**
   * trigger the function to send request to get Weather Data.
   */
  async onSubmit() {
    if (this.startDateString == '') return;
    let startDate = new Date(this.startDateString);
    console.log('startDate', startDate);
    this.weatherData = await this.getMonthWeatherData(startDate);
  }

  private async getMonthWeatherData(
    inputDate: Date
  ): Promise<ISingleHumidTempData[]> {
    const reqSize = 30;
    let result: ISingleHumidTempData[] = [];
    let startDate: Date = new Date(inputDate);
    startDate.setDate(inputDate.getDate() - reqSize);
    let resultLastIndx = 0;

    while (result.length < reqSize) {
      // Send request
      let fourDateData = await this.weatherSrv.GetFourDaystWeatherData(
        startDate
      );
      if (fourDateData.items.length == 0) {
        // if we have data in result variable, use the last result.Date to send request.
        if (resultLastIndx > 0) {
          resultLastIndx--;
          let lastResult = result[resultLastIndx];
          startDate = new Date(lastResult.Date);
        } else {
          startDate.setDate(startDate.getDate() + 1);
        }
        continue;
      }
      // transform the data to the format which display-chart-component and tabular-form-component can consume
      let humidTempData: ISingleHumidTempData[] =
        fourDateData.items[0].forecasts.map((element) => {
          return {
            Date: element.date,
            High_Humidity: element.relative_humidity.high,
            Low_Humidity: element.relative_humidity.low,
            High_Temperature: element.temperature.high,
            Low_Temperature: element.temperature.low,
          };
        });
      // push the acquired data to the result.
      for (let data of humidTempData) {
        if (result.findIndex((row) => row.Date == data.Date) != -1) continue;
        if (result.length >= reqSize || new Date(data.Date) > inputDate) break;
        result.push(data);
      }
      // start date of the next round is based on the latest date of data we acquired.
      resultLastIndx = result.length - 1;
      let lastResult = result[resultLastIndx];
      startDate = new Date(lastResult.Date);
    }
    return result;
  }
}
