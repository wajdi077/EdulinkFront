import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionParrainComponent } from './gestion-parrain.component';

describe('GestionParrainComponent', () => {
  let component: GestionParrainComponent;
  let fixture: ComponentFixture<GestionParrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionParrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionParrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
