import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEmploisComponent } from './mon-emplois.component';

describe('MonEmploisComponent', () => {
  let component: MonEmploisComponent;
  let fixture: ComponentFixture<MonEmploisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonEmploisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonEmploisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
