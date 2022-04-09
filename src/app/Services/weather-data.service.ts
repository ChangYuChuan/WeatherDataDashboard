import { Injectable, } from '@angular/core';
import { DatePipe } from  '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { tap,catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { ISgGovWeatherData } from '../Models/iweather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http: HttpClient, private datePipe:DatePipe) { }
  baseUrl:string = 'https://api.data.gov.sg/v1/environment/4-day-weather-forecast';
 /**
  * GetFourDaystWeatherData
  startDate:Date  */
  public async  GetFourDaystWeatherData(startDate:Date): Promise<ISgGovWeatherData> {

    if(startDate == undefined)
      throw('start date is undefined.');
    // let date = new Date(startDate);
    // date.setDate(startDate.getDate()-1);
    // transform the date to string by using datePipe
    let startDateString = this.datePipe.transform(startDate,'yyyy-MM-dd');
    if(startDateString == undefined) 
      throw('start date cannot be resolved to string.'); 
    
    // create httpParams with 4-day-weather-forecast parms
    let httpParams = new HttpParams().append(`date`,startDateString); 

    // send get request with params.
    return this.http.get<any>(this.baseUrl,{params:httpParams}).pipe(
        tap((data=>console.log('Get4DaystWeatherData',data))),
        catchError(this.handleError)
      ).toPromise(); 
  }
  private handleError(err:HttpErrorResponse) {
    console.error(err);
    return throwError(err);
  }
}


