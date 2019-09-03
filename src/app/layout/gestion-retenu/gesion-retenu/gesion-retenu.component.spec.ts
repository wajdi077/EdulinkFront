import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GesionRetenuComponent } from './gesion-retenu.component';

describe('GesionRetenuComponent', () => {
  let component: GesionRetenuComponent;
  let fixture: ComponentFixture<GesionRetenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesionRetenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GesionRetenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
