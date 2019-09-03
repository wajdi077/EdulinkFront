import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsalleComponent } from './uploadsalle.component';

describe('UploadsalleComponent', () => {
  let component: UploadsalleComponent;
  let fixture: ComponentFixture<UploadsalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
