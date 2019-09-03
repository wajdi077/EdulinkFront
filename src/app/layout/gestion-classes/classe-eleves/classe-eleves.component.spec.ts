import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseElevesComponent } from './classe-eleves.component';

describe('ClasseElevesComponent', () => {
  let component: ClasseElevesComponent;
  let fixture: ComponentFixture<ClasseElevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseElevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
