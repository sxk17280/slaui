import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthordialogComponent } from './authordialog.component';

describe('AuthordialogComponent', () => {
  let component: AuthordialogComponent;
  let fixture: ComponentFixture<AuthordialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthordialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthordialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
