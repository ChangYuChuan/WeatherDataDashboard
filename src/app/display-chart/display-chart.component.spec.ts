import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Highcharts from 'highcharts';
import { DisplayChartComponent } from './display-chart.component';

describe('DisplayChartComponent', () => {
  let component: DisplayChartComponent;
  let fixture: ComponentFixture<DisplayChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set chartOptions after Angular calls ngOnChanges', () => {
    component.dataSource = [
      {
        Date:'2022-01-02',
        High_Humidity:'100',
        Low_Humidity:'60',
        High_Temperature:'35',
        Low_Temperature:'30',
      },
      {
        Date:'2022-01-03',
        High_Humidity:'90',
        Low_Humidity:'50',
        High_Temperature:'34',
        Low_Temperature:'29',
      }
    ];
    let series:any[] = [{
      data:  ['100','90'],
      name: 'High_Humidity',
    },
    {
      data: ['60','50'],
      name: 'Low_Humidity',
    },
    {
      data: ['35','34'],
      name: 'High_Temperature',
    },
    {
      data: ['30','29'],
      name: 'Low_Temperature',
    }];
    component.ngOnChanges();
    
    expect(component.chartOptions.series).toEqual(series);
  });
});
