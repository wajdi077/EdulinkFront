import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutComponent } from './layout.component';
import { TopnavbarComponent } from '../shared/topnavbar/topnavbar.component';
import { AsidenavComponent } from '../shared/asidenav/asidenav.component';
import { FooternavbarComponent } from '../shared/footernavbar/footernavbar.component';
import { SettingnavbarComponent } from '../shared/settingnavbar/settingnavbar.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,

    ],
      declarations: [
        LayoutComponent,
        TopnavbarComponent,
        AsidenavComponent,
        FooternavbarComponent,
        SettingnavbarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
