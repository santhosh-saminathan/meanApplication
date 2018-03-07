import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  loginUser(data){
      return this.http.post("http://localhost:3000/login",data);
  }

  createAdmin(data){
    return this.http.post("http://localhost:3000/create/admin",data)
  }

}