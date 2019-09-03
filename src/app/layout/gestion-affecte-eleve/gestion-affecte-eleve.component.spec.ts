import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAffecteEleveComponent } from './gestion-affecte-eleve.component';

describe('GestionAffecteEleveComponent', () => {
  let component: GestionAffecteEleveComponent;
  let fixture: ComponentFixture<GestionAffecteEleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAffecteEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAffecteEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
