import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedbooksComponent } from './issuedbooks.component';

describe('IssuedbooksComponent', () => {
  let component: IssuedbooksComponent;
  let fixture: ComponentFixture<IssuedbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuedbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
