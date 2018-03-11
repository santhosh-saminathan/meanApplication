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

        this.adminService.getNewEvents().subscribe(data => {
            if (data) {
                this.newEvents = data;
            }
        }, err => {
            console.log(err);
        })

        this.adminService.getAllUsers().subscribe(data => {
            if (data) {
                this.allUsers = data;
            }
        }, err => {
            console.log(err);
        })

        this.eventService.getAllEvents({'userId':localStorage.getItem('userId')}).subscribe(data => {
            if (data) {
                this.allEvents = data;
            }
        }, err => {
            console.log(err);
        });
    }

    approveEvent(eventId) {
        this.adminService.approveEvent({ 'eventId': eventId }).subscribe(data => {
            if (data) {
                this.ngOnInit()
            }
        }, err => {
            console.log(err);
        });
    }

    deleteUser(userId) {
        let result = confirm("Are you sure? Want to delete User? Deleting User will delete all their Events.");
        if (result) {
            this.adminService.deleteUser({ 'userId': userId }).subscribe(data => {
                this.ngOnInit()
            }, err => {
                console.log(err);
            });
        }
    }

    deleteEvent(eventId) {
        let result = confirm("Are you sure? Want to delete Event?");
        if (result) {
            this.eventService.removeEvent({ 'eventId': eventId }).subscribe(data => {
                this.ngOnInit()
            }, err => {
                console.log(err);
            });
        }
    }

}
