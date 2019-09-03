import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiTempsComponent } from './emploi-temps.component';

describe('EmploiTempsComponent', () => {
  let component: EmploiTempsComponent;
  let fixture: ComponentFixture<EmploiTempsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiTempsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
