import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionaffectationniveauComponent } from './gestionaffectationniveau.component';

describe('GestionaffectationniveauComponent', () => {
  let component: GestionaffectationniveauComponent;
  let fixture: ComponentFixture<GestionaffectationniveauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionaffectationniveauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionaffectationniveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
