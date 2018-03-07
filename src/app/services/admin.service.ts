import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }

    getNewEvents() {
        return this.http.get("http://localhost:3000/admin/new/events");
    }

    getAllUsers() {
        return this.http.get("http://localhost:3000/admin/all/users");
    }

    deleteUser(data) {
        return this.http.post("http://localhost:3000/admin/delete/user", data);
    }

    deleteEvent(data) {
        return this.http.post("http://localhost:3000/admin/delete/event", data);
    }

    approveEvent(data) {
        return this.http.post("http://localhost:3000/admin/approve/event", data);
    }
}