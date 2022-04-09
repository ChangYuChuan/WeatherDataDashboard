import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularFormComponent } from './tabular-form.component';

describe('TabularFormComponent', () => {
  let component: TabularFormComponent;
  let fixture: ComponentFixture<TabularFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabularFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
