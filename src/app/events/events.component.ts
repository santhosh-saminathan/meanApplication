import { Component } from '@angular/core';
import { EventService } from './../services/events.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventComponent {
    name: string;
    password: string;
    allEvents: any;
    checked: any;
    eventId: any;
    successAlert: any;
    failureAlert: any;
    filterText: any;
    backupArray: any;
    autocomplete: any;

    constructor(private eventService: EventService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.getAllEve();


    }

    filterArray(data) {
        let temp = []

        this.backupArray.filter(function (el) {
            if (el.eventName.includes(data)) {
                temp.push(el);
            }
        });

        this.allEvents = temp;

    }

    getAllEve() {
        this.eventService.getAllEvents({'userId':localStorage.getItem('userId')}).subscribe(data => {
            this.allEvents = data;
            this.allEvents.sort((a: any, b: any) => {
                if (a.createdDate > b.createdDate) {
                    return -1;
                } else if (a.createdDate < b.createdDate) {
                    return 1;
                } else {
                    return 0;
                }
            });
            this.allEvents.forEach(event => {

                console.log(event);

                if (event.userId === localStorage.getItem('userId')) {
                    event.editable = true;
                }
                if (event.likes) {
                    event.totalLikes = event.likes.length;
                    event.likes.forEach(like => {
                        if (like.userId === localStorage.getItem('userId')) {
                            event.alreadyLiked = true;
                        }
                    });
                }
                if (event.rsvp) {
                    event.totalRsvp = event.rsvp.length;
                    event.rsvp.forEach(rsvp => {
                        if (rsvp.userId === localStorage.getItem('userId')) {
                            event.alreadyRsvp = true;
                        }
                    });
                }
            });

            this.backupArray = this.allEvents;

        },
            err => console.error(err),
            () => console.log('done loading'));
    }

    likeEvent(eventId, userId) {

        let data = {
            'likedUserId': localStorage.getItem('userId'),
            'eventId': eventId,
            'userId': userId
        }
        this.eventService.likeEvent(data).subscribe(data => {
            console.log(data);
            this.getAllEve();
        },
            err => console.error(err),
            () => console.log('done loading'));
    }

    rsvpEvent(eventId, userId) {
        console.log(eventId, userId);
        let data = {
            'rsvpUserId': localStorage.getItem('userId'),
            'eventId': eventId,
            'userId': userId
        }
        this.eventService.rsvpEvent(data).subscribe(data => {
            console.log(data);
            this.getAllEve();
        },
            err => console.error(err),
            () => console.log('done loading'));


    }

    removeEvent(eventId) {
        let result = confirm("Are you sure? Want to delete Event?");
        if (result) {
            console.log("Event id", eventId);
        let data = {
            'eventId': eventId,
        }
        this.eventService.removeEvent(data).subscribe(data => {
            console.log(data);
            this.getAllEve();
        }, err => {
            console.log("Error removing event");
        })
        }
        
    }

    unlikeEvent(eventId, userId) {
        console.log(event, userId);
        let data = {
            'unlikedUserId': localStorage.getItem('userId'),
            'eventId': eventId
        }
        this.eventService.unlikeEvent(data).subscribe(data => {
            console.log(data);
            this.getAllEve();
        },
            err => console.error(err),
            () => console.log('done loading'));
    }

    uncheckRsvp(eventId, userId) {
        console.log(event, userId);
        let data = {
            'uncheckedRsvpUserId': localStorage.getItem('userId'),
            'eventId': eventId
        }
        this.eventService.uncheckRsvp(data).subscribe(data => {
            console.log(data);
            this.getAllEve();
        },
            err => console.error(err),
            () => console.log('done loading'));
    }

 



}
