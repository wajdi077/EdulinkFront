import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParrainseleveComponent } from './add-parrainseleve.component';

describe('AddParrainseleveComponent', () => {
  let component: AddParrainseleveComponent;
  let fixture: ComponentFixture<AddParrainseleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParrainseleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParrainseleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
