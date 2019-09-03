import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionExclusComponent } from './gestion-exclus.component';

describe('GestionExclusComponent', () => {
  let component: GestionExclusComponent;
  let fixture: ComponentFixture<GestionExclusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionExclusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionExclusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
