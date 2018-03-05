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
    updateEventTitle: any;
    updateEventDesc: any;
    updateEventDate: any;
    updateEventLocation: any;
    updateEventCategory: any;
    eventId: any;
    successAlert: any;
    failureAlert: any;
    filterText: any;
    backupArray: any;
    dropdownList: any;
    dropdownSettings: any;
    autocomplete: any;

    constructor(private eventService: EventService, private router: Router) { }

    ngOnInit() {

        // var map = new google.maps.Map(document.getElementById('map'), {
        //     center: { lat: -33.8688, lng: 151.2195 },
        //     zoom: 13
        // });
        // var input = document.getElementById('searchTextField');

        // this.autocomplete = new google.maps.places.Autocomplete(input);

        // this.autocomplete.bindTo('bounds', map);

        this.getAllEve();

        this.dropdownList = [
            { "id": 1, "itemName": "category 1" },
            { "id": 2, "itemName": "category 2" },
            { "id": 3, "itemName": "category 3" },
            { "id": 4, "itemName": "category 4" },
            { "id": 5, "itemName": "category 5" },
            { "id": 6, "itemName": "category 6" },
            { "id": 7, "itemName": "category 7" },
            { "id": 8, "itemName": "category 8" }
        ];
        this.updateEventCategory = [];
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Categories",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: "myclass custom-class"
        };


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
        this.eventService.getAllEvents().subscribe(data => {
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
                        if (like === localStorage.getItem('userId')) {
                            event.alreadyLiked = true;
                        }
                    });
                }
                if (event.rsvp) {
                    event.totalRsvp = event.rsvp.length;
                    event.rsvp.forEach(rsvp => {
                        if (rsvp === localStorage.getItem('userId')) {
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

    editEvent(event) {

        console.log(event);
        this.updateEventTitle = event.eventName;
        this.updateEventDesc = event.description;
        this.updateEventDate = event.eventDate;
        this.updateEventLocation = event.location;
        this.eventId = event.eventId;
        this.updateEventCategory = event.categoryId;

        this.successAlert = "";
        this.failureAlert = "";
    }


    updateEvent() {
        let data = {
            'eventName': this.updateEventTitle,
            'eventId': this.eventId,
            'categoryId': this.updateEventCategory,
            'location': this.updateEventLocation,
            'eventDate': this.updateEventDate,
            'description': this.updateEventDesc
        }
        this.eventService.updateEvent(data).subscribe(data => {
            this.successAlert = "Event Updated successfully";
            this.getAllEve();

        }, err => {
            this.failureAlert = "Error While Updating Event";

        })


    }
    removeEvent(eventId){
        console.log("Event id",eventId);
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
