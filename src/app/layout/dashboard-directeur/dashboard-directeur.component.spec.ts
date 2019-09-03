import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDirecteurComponent } from './dashboard-directeur.component';

describe('DashboardDirecteurComponent', () => {
  let component: DashboardDirecteurComponent;
  let fixture: ComponentFixture<DashboardDirecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDirecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
