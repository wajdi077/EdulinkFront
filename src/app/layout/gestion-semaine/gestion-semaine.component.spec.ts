import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSemaineComponent } from './gestion-semaine.component';

describe('GestionSemaineComponent', () => {
  let component: GestionSemaineComponent;
  let fixture: ComponentFixture<GestionSemaineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSemaineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
