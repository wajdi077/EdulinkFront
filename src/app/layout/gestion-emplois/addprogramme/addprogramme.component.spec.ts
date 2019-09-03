import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprogrammeComponent } from './addprogramme.component';

describe('AddprogrammeComponent', () => {
  let component: AddprogrammeComponent;
  let fixture: ComponentFixture<AddprogrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprogrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprogrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
