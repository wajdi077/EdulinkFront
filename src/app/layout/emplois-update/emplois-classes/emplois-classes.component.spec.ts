import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploisClassesComponent } from './emplois-classes.component';

describe('EmploisClassesComponent', () => {
  let component: EmploisClassesComponent;
  let fixture: ComponentFixture<EmploisClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploisClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploisClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
