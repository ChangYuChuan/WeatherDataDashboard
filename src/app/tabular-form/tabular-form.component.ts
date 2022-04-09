import { Component, Input, OnChanges } from '@angular/core';
import {ISingleHumidTempData} from '../Models/isingle-humidity-temperature-data';

@Component({
  selector: 'app-tabular-form',
  templateUrl: './tabular-form.component.html',
  styleUrls: ['./tabular-form.component.css']
})
export class TabularFormComponent {
  readonly columnDefs = [
    { field: "Date", sortable: true }, { field: "High_Humidity" }, { field: "Low_Humidity" }, { field: "High_Temperature" },{ field: "Low_Temperature" }
  ];
  @Input() dataSource:ISingleHumidTempData[] = [];
  constructor() { }
}
