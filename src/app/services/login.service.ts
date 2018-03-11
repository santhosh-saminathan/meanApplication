import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../constants/constants';


@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  loginUser(data){
      return this.http.post(Constants.SERVICES_DOMAIN + "login",data);
  }

  createAdmin(data){
    return this.http.post(Constants.SERVICES_DOMAIN + "create/admin",data)
  }

}