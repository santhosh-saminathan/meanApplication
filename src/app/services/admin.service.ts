import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../constants/constants';



@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }

    getNewEvents() {
        return this.http.get(Constants.SERVICES_DOMAIN + "admin/new/events");
    }

    getAllUsers() {
        return this.http.get(Constants.SERVICES_DOMAIN + "admin/all/users");
    }

    deleteUser(data) {
        return this.http.post(Constants.SERVICES_DOMAIN + "admin/delete/user", data);
    }

    deleteEvent(data) {
        return this.http.post(Constants.SERVICES_DOMAIN + "admin/delete/event", data);
    }

    approveEvent(data) {
        return this.http.post(Constants.SERVICES_DOMAIN + "admin/approve/event", data);
    }
}