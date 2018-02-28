import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  loginUser(username,password){
      return this.http.post("http://localhost:3000/login",{'username':username,'password':password});
  }

}