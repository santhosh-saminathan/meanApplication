import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../constants/constants';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  getAllEvents(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "all/events", data);
  }
  createEvent(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "event/create", data);
  }
  likeEvent(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "event/like", data);
  }
  rsvpEvent(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "event/rsvp", data);
  }
  updateEvent(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "event/update", data);
  }
  unlikeEvent(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "event/unlike", data);
  }
  uncheckRsvp(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "event/uncheck/rsvp", data);
  }
  removeEvent(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "event/remove", data);
  }
  getEventDetail(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "event/details", data);
  }

}