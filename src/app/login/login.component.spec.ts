import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HelpComponent } from '../component/help/help.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HelpComponent],
      imports:[ReactiveFormsModule,  AppMaterialModule, NoopAnimationsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
