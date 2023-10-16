import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddEditContactPopupComponent } from '../add-edit-contact-popup/add-edit-contact-popup.component';
//import { CustomToastrService } from '../services/custom-toastr.service';
//import { ConfirmPopupService } from '../services/confirm-popup.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class',
  };

  contactList: Array<any> = [];
  searchData: string;
  constructor(private contactService: ContactService, private modalService: NgbModal) {
      this.searchData ="data";
	  }

    ngOnInit(): void {
      this.fetchContactList();
    }
    fetchContactList() {
      this.contactService.getContactList().subscribe((resp: any) => {
        console.log(resp);
        this.contactList = resp;
      });
    }

    onAddNewContact() {
      console.log(this.searchData);
  
      this.ngbModalOptions.windowClass = 'app-create-contact-popup';
      const modalRef = this.modalService.open(AddEditContactPopupComponent, this.ngbModalOptions);
      modalRef.componentInstance.contactData = null;
      modalRef.componentInstance.title = "Add New Contact";
      modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
        this.fetchContactList();
      });
    }
  
    onEditContact(contactData: any) {
      this.ngbModalOptions.windowClass = 'app-create-contact-popup';
      const modalRef = this.modalService.open(AddEditContactPopupComponent, this.ngbModalOptions);
      modalRef.componentInstance.contactData = contactData;
      modalRef.componentInstance.title = "Edit Contact";
      modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
        this.fetchContactList();
      });
    }

    onDeleteContact(contactData: any) {
      this.contactService.deleteContact(contactData.id).subscribe((resp: any) => {
        console.log(resp);
        this.contactList = resp;
        this.fetchContactList();
      });
    }

}
