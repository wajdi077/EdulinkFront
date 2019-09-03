import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEleveComponent } from './add-new-eleve.component';

describe('AddNewEleveComponent', () => {
  let component: AddNewEleveComponent;
  let fixture: ComponentFixture<AddNewEleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
