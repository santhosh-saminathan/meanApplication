import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { EventService } from './../services/events.service';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    newEvents: any = [];
    allUsers: any = [];
    allEvents: any = [];

    constructor(private router: Router, private adminService: AdminService, private eventService: EventService) { }

    ngOnInit() {
        console.log("calls automatically");

        this.adminService.getNewEvents().subscribe(data => {
            if (data) {
                console.log(data);
                this.newEvents = data;
            }

        }, err => {
            console.log(err);
        })

        this.adminService.getAllUsers().subscribe(data => {
            if (data) {
                console.log(data);
                this.allUsers = data;
            }

        }, err => {
            console.log(err);
        })

        this.eventService.getAllEvents().subscribe(data => {
            if (data) {
                this.allEvents = data;
                console.log(this.allEvents);
            }

        }, err => {
            console.log(err);
        })
    }

    approveEvent(eventId) {
        this.adminService.approveEvent({ 'eventId': eventId }).subscribe(data => {
            if (data) {
                this.ngOnInit()
                console.log(data);
            }

        }, err => {
            console.log(err);
        })
    }

    deleteUser(userId) {
        this.adminService.deleteUser({ 'userId': userId }).subscribe(data => {
            console.log(data);
            this.ngOnInit()
        }, err => {
            console.log(err);
        })
    }

    deleteEvent(eventId) {
        this.eventService.removeEvent({ 'eventId': eventId }).subscribe(data => {
            //this.allEvents = data;
            this.ngOnInit()
        }, err => {
            console.log(err);
        })
    }

}
