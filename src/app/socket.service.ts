import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';

import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'https://chatapi.edwisor.com';

  private socket;


  constructor(public _http:HttpClient) {
    // Connection is being created
    // That HandShake is happening.

    this.socket = io(this.url);
  }


  // Start of events to be listened.

  public verifyUser = () => {
    
    // We need to make an observable,
    // As all the components are to be interacted
    // with observable only
    
    let observerOne =  Observable.create((observer) => {

      // Listening
      this.socket.on('verifyUser', (data) => {
        
        observer.next(data);
      }); // end Socket
    }); // end Observable
    return observerOne;
  } // end verifyUser

  public onlineUserList = () => {
    
    let observerTwo = Observable.create((observer) => {

      // Listening
      this.socket.on("online-user-list", (userList) => {
        observer.next(userList);
      }); // end socket
    }); // end Observable
    return observerTwo;
  } // end onlineUserList

  public disconnectSocket = () => {
    let disconnectObserver = Observable.create((observer) => {

      // Listening
      this.socket.on("disconnect", () => {
        observer.next();
      }); // end socket
    }); // end Observable
    return disconnectObserver;
  }  // end disconnect Socket

  // End events to be listened


  // Start of events to be emitted
  // component calls this method along with the auth token
  public setUser = (authToken) => {
    this.socket.emit("set-user", authToken);
  } // end set user

  // end of events to be emitted

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if(err.error instanceof Error) {
      errorMessage = `An error occured: ${err.error.message}`;
    }else{
      errorMessage = `Server returned code: ${err.status}`;
    }
    console.error(errorMessage);

    return Observable.throw(errorMessage);
  } // END handleError
}
