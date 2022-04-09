import { Component } from '@angular/core';
import { ISingleHumidTempData } from './Models/isingle-humidity-temperature-data';
import { ISgGovWeatherData,IForecastWeatherData } from './Models/iweather-data';
import { WeatherDataService } from './Services/weather-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weatherData:ISingleHumidTempData[] = [];
  startDateString:string = '';
  today:any = this.datePipe.transform(new Date() ,'yyyy-MM-dd');
  breakLoop:boolean = false;
  constructor(private weatherSrv: WeatherDataService, private datePipe:DatePipe){
  }
  /**
   * trigger the function to send request to get Weather Data.
   */
  async onSubmit() {
    if(this.startDateString == '')
      return;
    let startDate = new Date(this.startDateString);
    console.log('startDate',startDate);
    // let response = await this.weatherSrv.GetFourDaystWeatherData(startDate);
    // console.log('onSubmit',response);
    // this.weatherData = this.transformData(response);
    this.weatherData = await this.monthForecast_new(startDate);
    // let date:Date = new Date(startDate);
    // console.log(`startDate.getDate() ${startDate.getDate()}  i ${8}`);
    // date.setDate(startDate.getDate()+8);
    // console.log(`date ${date}  today ${startDate}`);

  }
 /**
  * breakLoop
  */
 public breakLoopMethod() {
   this.breakLoop = true;
 }
  private async  monthForecast_new(inputDate:Date): Promise<ISingleHumidTempData[]> {
    const reqSize = 30;
    let today = new Date();
    let result:ISingleHumidTempData[] = [];
    let startDate:Date = new Date(inputDate);
    startDate.setDate( inputDate.getDate() -reqSize);
    let resultLastIndx = 0;
    while(result.length < reqSize && this.breakLoop == false) {
      console.log(`send request to retrieve the data of ${startDate}`);
      let fourDateData = await this.weatherSrv.GetFourDaystWeatherData(startDate);
      if(fourDateData.items.length == 0) {
        // if we have data in result variable, use the last result.Date to send request.
        if(resultLastIndx > 0) {
          resultLastIndx--;
          let lastResult = result[resultLastIndx];
          startDate = new Date(lastResult.Date);
          console.log('if fourDateData.Items is empty. change the startDate to',startDate);
        } else {
           startDate.setDate( startDate.getDate() + 1);
           console.log('if fourDateData.Items is empty and resultLastIndx == 0. change the startDate to',startDate);
        }
        continue;
      }


      let humidTempData:ISingleHumidTempData[] = fourDateData.items[0].forecasts.map(
        (element)=>{
          return { 
          Date:element.date,
          High_Humidity:element.relative_humidity.high,
          Low_Humidity:element.relative_humidity.low,
          High_Temperature:element.temperature.high,
          Low_Temperature:element.temperature.low
          };
        }
      );
      for(let data of humidTempData) {
        if(result.findIndex(row=> row.Date == data.Date) != -1 || result.length >= reqSize)
          continue;
        result.push(data);
      }
      resultLastIndx = result.length-1;
      let lastResult = result[resultLastIndx];
      startDate = new Date(lastResult.Date);
    }
    return result;
  }


  private async  monthForecast_old(startDate:Date): Promise<ISingleHumidTempData[]> {
    let today = new Date();
    let result:ISingleHumidTempData[] = [];
    let date:Date = new Date(startDate);
    for(let i =0; i<=30 ; i =i+4) {
      console.log(`startDate.getDate() ${startDate.getDate()}  i ${i}`);
      
      console.log(`1. date ${date}  today ${today}`);
      let temp = i;
      let fourDateData:IForecastWeatherData[] =[] ;
      if(fourDateData.length == 0) {
        date.setDate(startDate.getDate()+temp);
        fourDateData = (await this.weatherSrv.GetFourDaystWeatherData(date)).items;
        temp = temp -1;
      }
      // It looks like that the data we can retrieve over API is not comprehensive. Therefore, check if the items is empty.

      let humidTempData = this.transformToHumidTemp(fourDateData);
      for(let data of humidTempData) {
        if(result.length >= 30)
          break;
        result.push(data);
      }
      console.log(`2. date ${date}  today ${today}`);
      if(date > today) {
        break;
      }
      // reset the date
      date = new Date(startDate);
    }
    
    return result;
  }

  private async monthForecastOneByOne(startDate:Date): Promise<ISingleHumidTempData[]> {
    let today = new Date();
    let result:ISingleHumidTempData[] = [];
    let date:Date = new Date(startDate);
    let mover = 0;
    while(result.length < 30 ) {
      date.setDate( startDate.getDate() + mover -30);
      console.log(`date ${date}  today ${today}`);
      if(date > today) {
        break;
      }
      let fourDateData = await this.weatherSrv.GetFourDaystWeatherData(date);
      
      // It looks like that the data we can retrieve over API is not comprehensive. Therefore, check if the items is empty.
      if(fourDateData.items.length == 0) {
        // if the list is empty, move backward and try again
        mover++;
        date = new Date(startDate);
        continue;
      }
      // Transform data to humidity and temperature format.
      let humidTempData:ISingleHumidTempData[] = fourDateData.items[0].forecasts.map(
        (element)=>{
          return { 
          Date:element.date,
          High_Humidity:element.relative_humidity.high,
          Low_Humidity:element.relative_humidity.low,
          High_Temperature:element.temperature.high,
          Low_Temperature:element.temperature.low
          };
        }
      );
      for(let data of humidTempData) {
        result.push(data);
        if(result.length >= 30 )
          break;
      }
      mover = mover + humidTempData.length;
      // reset the date. Purpose of this line is to make sure that the month of 'date' variable won't be changed by last modification. 
      date = new Date(startDate);
    }
    
    return result;
  }

  /**
   * Transform the data from the API response to the format which only contains date, humidity and temperature. 
   * @param input ISgGovWeatherData
   * @returns  ISingleHumidTempData[]
   */
  private transformToHumidTemp(input:IForecastWeatherData[]):ISingleHumidTempData[] {
    if(input == undefined ||input.length == 0 )
      return [];
    let result:ISingleHumidTempData[] = [];

    input[0].forecasts.forEach(
      (element)=>{
        let output:ISingleHumidTempData = {
          Date:element.date,
          High_Humidity:element.relative_humidity.high,
          Low_Humidity:element.relative_humidity.low,
          High_Temperature:element.temperature.high,
          Low_Temperature:element.temperature.low
        };
        result.push(output);
      }
    )
    return result;
  }
}
