import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEmploisComponent } from './modifier-emplois.component';

describe('ModifierEmploisComponent', () => {
  let component: ModifierEmploisComponent;
  let fixture: ComponentFixture<ModifierEmploisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierEmploisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierEmploisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
