import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../models/IContact';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
private  serverUrl : string = `http://localhost:9000`; // json server url
constructor(private httpClient : HttpClient) { }
// Het all Contacts
public getAllContacts() : Observable<IContact[]>
{
  let dataURL : string = `${this.serverUrl}/contacts`;
  return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
}
// Get Single Contact
public getContact(contactId : string):Observable<IContact>
{
  let dataURL : string = `${this.serverUrl}/contacts/${contactId}`;
  return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
}
//Create a Contact
public createContact(contact : IContact):Observable<IContact>{
  let dataURL : string = `${this.serverUrl}/contacts`;
  return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));
}
//Update  Contact
public updateContact(contact : IContact,contactId:string):Observable<IContact>{
  let dataURL : string = `${this.serverUrl}/contacts/${contactId}`;
  return this.httpClient.put<IContact>(dataURL,contact).pipe(catchError(this.handleError));
}
//Delete  Contact
public deleteContact(contactId:string):Observable<{}>{
  let dataURL : string = `${this.serverUrl}/contacts/${contactId}`;
  return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
}

// Error Handling
public handleError(error : HttpErrorResponse)
{
  let errorMessage : string = '';
  if(error.error instanceof ErrorEvent){
    // Client error
    errorMessage = `Error : ${error.error.message}`
  }else{
    // server error
    errorMessage = `Status : ${error.status} \n Message : ${error.message}`;
  }
  return throwError(errorMessage);
}
}
