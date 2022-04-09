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
  /**
   * breakLoop
   */
  public breakLoopMethod() {
    this.breakLoop = true;
  }
  private async getMonthWeatherData(
    inputDate: Date
  ): Promise<ISingleHumidTempData[]> {
    const reqSize = 30;
    let today = new Date();
    let result: ISingleHumidTempData[] = [];
    let startDate: Date = new Date(inputDate);
    startDate.setDate(inputDate.getDate() - reqSize);
    let resultLastIndx = 0;
    while (result.length < reqSize && this.breakLoop == false) {
      console.log(`send request to retrieve the data of ${startDate}`);
      let fourDateData = await this.weatherSrv.GetFourDaystWeatherData(
        startDate
      );
      if (fourDateData.items.length == 0) {
        // if we have data in result variable, use the last result.Date to send request.
        if (resultLastIndx > 0) {
          resultLastIndx--;
          let lastResult = result[resultLastIndx];
          startDate = new Date(lastResult.Date);
          console.log(
            'if fourDateData.Items is empty. change the startDate to',
            startDate
          );
        } else {
          startDate.setDate(startDate.getDate() + 1);
          console.log(
            'if fourDateData.Items is empty and resultLastIndx == 0. change the startDate to',
            startDate
          );
        }
        continue;
      }

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
      for (let data of humidTempData) {
        if (result.findIndex((row) => row.Date == data.Date) != -1) continue;
        if (result.length >= reqSize) break;
        result.push(data);
      }
      resultLastIndx = result.length - 1;
      let lastResult = result[resultLastIndx];
      startDate = new Date(lastResult.Date);
    }
    return result;
  }
}
