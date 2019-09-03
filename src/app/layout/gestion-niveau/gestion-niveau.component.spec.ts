import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNiveauComponent } from './gestion-niveau.component';

describe('GestionNiveauComponent', () => {
  let component: GestionNiveauComponent;
  let fixture: ComponentFixture<GestionNiveauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionNiveauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
