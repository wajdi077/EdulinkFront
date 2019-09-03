import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardParrainComponent } from './dashboard-parrain.component';

describe('DashboardParrainComponent', () => {
  let component: DashboardParrainComponent;
  let fixture: ComponentFixture<DashboardParrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardParrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardParrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
