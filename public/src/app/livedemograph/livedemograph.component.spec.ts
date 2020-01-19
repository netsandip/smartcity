import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { livedemographComponent } from './livedemograph.component';

describe('IotdeviceComponent', () => {
    let component: livedemographComponent;
    let fixture: ComponentFixture<livedemographComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [livedemographComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(livedemographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
