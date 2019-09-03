import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNiveauComponent } from './add-niveau.component';

describe('AddNiveauComponent', () => {
  let component: AddNiveauComponent;
  let fixture: ComponentFixture<AddNiveauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNiveauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
