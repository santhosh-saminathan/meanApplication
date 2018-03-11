import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../constants/constants';


@Injectable()
export class SignupService {
  constructor(private http: HttpClient) { }

 
  signupUser(data){
    return this.http.post(Constants.SERVICES_DOMAIN + "signup",data)  }

}