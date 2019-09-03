import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmploisComponent } from './gestion-emplois.component';

describe('GestionEmploisComponent', () => {
  let component: GestionEmploisComponent;
  let fixture: ComponentFixture<GestionEmploisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEmploisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEmploisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
