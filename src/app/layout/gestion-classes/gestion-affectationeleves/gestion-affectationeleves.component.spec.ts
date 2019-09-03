import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAffectationelevesComponent } from './gestion-affectationeleves.component';

describe('GestionAffectationelevesComponent', () => {
  let component: GestionAffectationelevesComponent;
  let fixture: ComponentFixture<GestionAffectationelevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAffectationelevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAffectationelevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
