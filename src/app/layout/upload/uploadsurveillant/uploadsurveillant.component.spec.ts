import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsurveillantComponent } from './uploadsurveillant.component';

describe('UploadsurveillantComponent', () => {
  let component: UploadsurveillantComponent;
  let fixture: ComponentFixture<UploadsurveillantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsurveillantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsurveillantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
