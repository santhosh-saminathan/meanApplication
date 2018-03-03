import { Component } from '@angular/core';
import { EventService } from './../services/events.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare let google: any;

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
    updateEventTitle:any;
    updateEventDesc:any;
    updateEventDate:any;
    updateEventLocation:any;
    updateEventCategory:any;
    eventId:any;
    successAlert:any;
    failureAlert:any; 

    constructor(private eventService: EventService, private router: Router) { }

    ngOnInit() {

        this.getAllEve();
 }



    getAllEve() {
        this.eventService.getAllEvents().subscribe(data => {
            this.allEvents = data;
            this.allEvents.forEach(event => {
                console.log(event)
                if(event.userId === localStorage.getItem('userId')){
                    event.editable = true;
                }
                if (event.likes) {
                    event.likes.forEach(like => {
                        if (like === localStorage.getItem('userId')) {
                            event.alreadyLiked = true;
                        }
                    });
                }
                if (event.rsvp) {
                    event.rsvp.forEach(rsvp => {
                        if (rsvp === localStorage.getItem('userId')) {
                            event.alreadyRsvp = true;
                        }
                    });
                }
            });

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

    editEvent(event){
        console.log(event);
        this.updateEventTitle = event.eventName;
        this.updateEventDesc = event.description;
        this.updateEventDate = event.eventDate;
        this.updateEventLocation = event.location;
        this.eventId = event.eventId;
        this.updateEventCategory = event.categoryId[0];

        this.successAlert="";
        this.failureAlert="";
    }


    updateEvent(){
        let data = {
            'eventName':this.updateEventTitle,
            'eventId':this.eventId,
            'categoryId':this.updateEventCategory,
            'location':this.updateEventLocation,
            'eventDate':this.updateEventDate,
            'description': this.updateEventDesc
        }
        this.eventService.updateEvent(data).subscribe(data => {
            this.successAlert = "Event Updated successfully";
            this.getAllEve();

        },err =>{
            this.failureAlert = "Error While Updating Event";

        })


    }


}
