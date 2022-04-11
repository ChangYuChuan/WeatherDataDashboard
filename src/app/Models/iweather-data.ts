export interface IForecastWeatherData {
    update_timestamp:string;
    timestamp:string;
    forecasts: ISingleDateForecastData[];
}
export interface ISingleDateForecastData {
    date:string;
    timestamp:string;
    forecast:string;
    relative_humidity: {
        low:any;
        high: any;
    };
    temperature: {
        low:any;
        high: any;
    };
    wind: {
        speed:{
            low:any;
            high: any;
        };
        direction:string;
    };
}


export interface ISgGovWeatherData {
    api_info: {
        status:string;
    };
    items: IForecastWeatherData[];
  }
