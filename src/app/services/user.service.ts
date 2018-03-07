import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  
  getUserType(data){
    return this.http.post("http://localhost:3000/user/type",data)  }

}