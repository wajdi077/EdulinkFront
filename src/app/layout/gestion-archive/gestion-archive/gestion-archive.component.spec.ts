
import { GestionArchiveComponent } from './gestion-archive.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';


describe('GestionArchiveComponent', () => {
  let component: GestionArchiveComponent;
  let fixture: ComponentFixture<GestionArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
