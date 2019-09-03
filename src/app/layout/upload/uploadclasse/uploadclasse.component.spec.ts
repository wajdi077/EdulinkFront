import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadclasseComponent } from './uploadclasse.component';

describe('UploadclasseComponent', () => {
  let component: UploadclasseComponent;
  let fixture: ComponentFixture<UploadclasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadclasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
