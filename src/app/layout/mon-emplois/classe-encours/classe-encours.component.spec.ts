import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseEncoursComponent } from './classe-encours.component';

describe('ClasseEncoursComponent', () => {
  let component: ClasseEncoursComponent;
  let fixture: ComponentFixture<ClasseEncoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseEncoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
