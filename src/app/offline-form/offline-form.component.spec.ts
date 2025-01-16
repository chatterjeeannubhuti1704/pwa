import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineFormComponent } from './offline-form.component';

describe('OfflineFormComponent', () => {
  let component: OfflineFormComponent;
  let fixture: ComponentFixture<OfflineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfflineFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
