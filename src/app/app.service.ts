import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public baseUrl = "https://chatapi.edwisor.com"

  constructor(private _http: HttpClient) { }

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  public signUpService(userSignedUpData): Observable<any> {
    console.log(userSignedUpData);
    const params = new HttpParams ()
    .set('firstName', userSignedUpData.firstName)
    .set('lastName', userSignedUpData.lastName)
    .set('mobileNumber', userSignedUpData.mobileNumber)
    .set('email', userSignedUpData.email)
    .set('password', userSignedUpData.password)
    .set('apiKey', userSignedUpData.apiKey);

    let data = this._http.post(`${this.baseUrl}/api/v1/users/signup`, params);
    console.log(data);

    return data;
  }

  public signInService(userSignedInData): Observable<any> {
    const params = new HttpParams ()
    .set('email', userSignedInData.email)
    .set('password', userSignedInData.password)
    
    let data = this._http.post(`${this.baseUrl}/api/v1/users/login`, params);
    return data;
  }

}
