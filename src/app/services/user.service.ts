import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../constants/constants';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }


  getUserType(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "user/type", data)
  }

  getUserDetails(data){
    return this.http.post(Constants.SERVICES_DOMAIN + "user/details", data)
  }

  updateUser(data){
    return this.http.post(Constants.SERVICES_DOMAIN + "user/update", data)
  }

}