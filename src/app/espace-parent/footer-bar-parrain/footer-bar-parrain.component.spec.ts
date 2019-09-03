import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBarParrainComponent } from './footer-bar-parrain.component';

describe('FooterBarParrainComponent', () => {
  let component: FooterBarParrainComponent;
  let fixture: ComponentFixture<FooterBarParrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBarParrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBarParrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
