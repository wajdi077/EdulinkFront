
import { GestionHistoriqueComponent } from './gestion-historique.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('GestionHistoriqueComponent', () => {
  let component: GestionHistoriqueComponent;
  let fixture: ComponentFixture<GestionHistoriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionHistoriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
