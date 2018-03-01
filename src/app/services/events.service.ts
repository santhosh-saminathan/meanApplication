import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  getAllEvents(){
      return this.http.get("http://localhost:3000/all/events");
  }

}