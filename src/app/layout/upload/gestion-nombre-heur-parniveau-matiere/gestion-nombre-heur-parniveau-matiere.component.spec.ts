import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNombreHeurParniveauMatiereComponent } from './gestion-nombre-heur-parniveau-matiere.component';

describe('GestionNombreHeurParniveauMatiereComponent', () => {
  let component: GestionNombreHeurParniveauMatiereComponent;
  let fixture: ComponentFixture<GestionNombreHeurParniveauMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionNombreHeurParniveauMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNombreHeurParniveauMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
