import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  getAllEvents(){
      return this.http.post("http://localhost:3000/all/events",{'userId':localStorage.getItem('userId')});
  }

  createEvent(data){
    return this.http.post("http://localhost:3000/event/create",data);
  }

  likeEvent(data){
    return this.http.post("http://localhost:3000/event/like",data);
  }

}