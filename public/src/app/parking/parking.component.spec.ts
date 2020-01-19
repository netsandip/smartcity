import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { parkingComponent } from './parking.component';

describe('IotdeviceComponent', () => {
  let component: parkingComponent;
  let fixture: ComponentFixture<parkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ parkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(parkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
