import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceParentComponent } from './espace-parent.component';

describe('EspaceParentComponent', () => {
  let component: EspaceParentComponent;
  let fixture: ComponentFixture<EspaceParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
