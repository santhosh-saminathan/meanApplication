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
    nolike: boolean = true;
    like: boolean = false;
    norsvp: boolean = true;
    rsvp: boolean = false;

    constructor(private eventService: EventService, private router: Router) { }

    ngOnInit() {
        this.eventService.getAllEvents().subscribe(data => {
            console.log(data);
            this.allEvents = data;
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
            this.nolike = false;
            this.like = true;
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
            this.norsvp = false;
            this.rsvp = true;
        },
            err => console.error(err),
            () => console.log('done loading'));


    }


}
