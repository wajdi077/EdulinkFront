import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarParentComponent } from './navbar-parent.component';

describe('NavbarParentComponent', () => {
  let component: NavbarParentComponent;
  let fixture: ComponentFixture<NavbarParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
