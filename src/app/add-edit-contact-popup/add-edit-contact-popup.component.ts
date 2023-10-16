import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-edit-contact-popup',
  templateUrl: './add-edit-contact-popup.component.html',
  styleUrls: ['./add-edit-contact-popup.component.css']
})
export class AddEditContactPopupComponent implements OnInit {
  _refresh = new BehaviorSubject<any>({});
  @Output() refreshParent = this._refresh.asObservable();
  @Input() public contactData: any;
  @Input() public title: any;

  public saveContactForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, 
    private contactService: ContactService) {
    this.saveContactForm = this.formBuilder.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }


  get id() { return this.saveContactForm.get("id"); }
  get firstName() { return this.saveContactForm.get("firstName"); }
  get lastName() { return this.saveContactForm.get("lastName"); }
  get email() { return this.saveContactForm.get("email"); }

  ngOnInit(): void {
    if (this.contactData) {
      this.id?.setValue(this.contactData.id);
      this.firstName?.setValue(this.contactData.firstName);
      this.lastName?.setValue(this.contactData.lastName);
      this.email?.setValue(this.contactData.email);
    }
  }


  onSaveContact() {
    if (this.saveContactForm.invalid) {
      return;
    }

    let payload = this.saveContactForm.value;
    console.log(payload);
    
    if (this.contactData) {
      this.editContact(payload);
    } else {
      this.addContact(payload);
    }
  }

  addContact(payload: any) {
    this.contactService.addNewContact(payload).subscribe((resp: any) => {
      this._refresh.next({
        responseCode: "E000",
        responseMessage: "Success"
      });
      this.activeModal.close('Override click');
    }, (error: any) => {
      console.log(error);
      this._refresh.next({
        responseCode: "E001",
        responseMessage: "Failed"
      });
      this.activeModal.close('Override click');
    })
  }

  editContact(payload: any) {
    this.contactService.updateContact(payload).subscribe((resp: any) => {
      this._refresh.next({
        responseCode: "E000",
        responseMessage: "Success"
      });
      this.activeModal.close('Override click');
    }, (error: any) => {
      console.log(error);
      this._refresh.next({
        responseCode: "E001",
        responseMessage: "Failed"
      });
      this.activeModal.close('Override click');
    })
  }

  onDeleteContact(contactData: any) {
    this.contactService.deleteContact(contactData.id).subscribe((resp: any) => {
      console.log(resp);
      //this.contactList = resp;
    });
  }



}
