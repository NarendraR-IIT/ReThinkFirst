import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url: string = "http://localhost:3003";
  constructor(private http: HttpClient) { }

  getContactList(): Observable<any> {

    return this.http.get<any>(this.url + "/contact");
  }

  addNewContact(payload: any) {

    return this.http.post<any>(this.url + "/contact", payload);
  }
  updateContact(payload: any) {

    return this.http.put<any>(this.url + "/contact/" + payload.id, payload);
  }

  deleteContact(ContactID: any) {

    return this.http.delete<any>(this.url + "/contact/" + ContactID);
  }


}


