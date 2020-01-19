import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivegraphsComponent } from './livegraphs.component';

describe('IotdeviceComponent', () => {
  let component: LivegraphsComponent;
  let fixture: ComponentFixture<LivegraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivegraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivegraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
