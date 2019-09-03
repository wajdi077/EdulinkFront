import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterEleveComponent } from './affecter-eleve.component';

describe('AffecterEleveComponent', () => {
  let component: AffecterEleveComponent;
  let fixture: ComponentFixture<AffecterEleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffecterEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
