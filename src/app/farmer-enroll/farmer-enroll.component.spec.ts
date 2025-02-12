import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerEnrollComponent } from './farmer-enroll.component';

describe('FarmerEnrollComponent', () => {
  let component: FarmerEnrollComponent;
  let fixture: ComponentFixture<FarmerEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerEnrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
