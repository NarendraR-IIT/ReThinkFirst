import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContactPopupComponent } from './add-edit-contact-popup.component';

describe('AddEditContactPopupComponent', () => {
  let component: AddEditContactPopupComponent;
  let fixture: ComponentFixture<AddEditContactPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditContactPopupComponent]
    });
    fixture = TestBed.createComponent(AddEditContactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
