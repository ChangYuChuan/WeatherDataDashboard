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
        low:string;
        high: string;
    };
    temperature: {
        low:string;
        high: string;
    };
    wind: {
        speed:{
            low:string;
            high: string;
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
