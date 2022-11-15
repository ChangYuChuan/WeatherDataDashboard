import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { ISingleHumidTempData } from '../Models/isingle-humidity-temperature-data';

@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.css'],
})
export class DisplayChartComponent implements OnChanges, OnInit {
  @Input() dataSource: ISingleHumidTempData[] = [];
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {};
  updateFlag = false;
  constructor() {}

  ngOnInit(): void {
    // Initilize the chart
    this.chartOptions = {
      title: { text: '30 days Humidity and Temperature in Singapore' },
      series: [
        {
          data: [],
          type: 'column',
          name: 'High_Humidity',
          yAxis: 1,
          tooltip: {
            valueSuffix: '%',
          },
        },
        {
          data: [],
          type: 'column',
          name: 'Low_Humidity',
          yAxis: 1,
          tooltip: {
            valueSuffix: '%',
          },
        },
        {
          data: [],
          type: 'line',
          name: 'High_Temperature',
          tooltip: {
            valueSuffix: '°C',
          },
        },
        {
          data: [],
          type: 'line',
          name: 'Low_Temperature',
          tooltip: {
            valueSuffix: '°C',
          },
        },
      ],
      xAxis: {
        categories: [],
      },
      yAxis: [
        {
          title: { text: 'Temperature' },
        },
        {
          title: { text: 'Humidity' },
          opposite: true,
        },
      ],
    };
  }

  ngOnChanges(): void {
    if (this.dataSource.length == 0) return;

    let dataSourceMap = new Map<string, any[]>();
    let categories: string[] = [];
    let series: any[] = [];

    //transform the dataSource to hashmap to make assigning value easier.
    for (let data of this.dataSource) {
      for (let property in data) {
        let value = Object(data)[property];
        if (dataSourceMap.has(property))
          dataSourceMap.get(property)?.push(value);
        else dataSourceMap.set(property, [value]);
      }
    }

    //assign the values to categories and series by key.
    for (let [key, value] of dataSourceMap) {
      if (key == 'Date') {
        categories = value;
        continue;
      }
      series.push({
        data: value,
        name: key,
      });
    }

    // assign the value to chartOptions.
    this.updateFlag = true;
    this.chartOptions = {
      series: series,
      xAxis: {
        categories: categories,
      },
    };
  }
}
