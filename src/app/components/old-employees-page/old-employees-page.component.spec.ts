import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldEmployeesPageComponent } from './old-employees-page.component';

describe('EmployeesPageComponent', () => {
  let component: OldEmployeesPageComponent;
  let fixture: ComponentFixture<OldEmployeesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldEmployeesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldEmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
