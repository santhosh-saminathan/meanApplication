import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from './../services/events.service';
declare let google: any;

@Component({
    selector: 'eventDetails',
    templateUrl: './eventDetails.component.html',
    styleUrls: ['./eventDetails.component.css']
})
export class EventDetailsComponent {
    //location:any;
    autocomplete: any;
    distance: String;
    timeTaken: String;


    constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) { }
    event: any;
    updateEventTitle: any;
    updateEventDesc: any;
    updateEventDate: any;
    updateEventLocation: any;
    eventId: any;
    updateEventCategory: any;
    dropdownList: any;
    dropdownSettings: any;



    calculateAndDisplayRoute(directionsService, directionsDisplay) {
       directionsService.route({
            origin: localStorage.getItem('lat') + ',' + localStorage.getItem('lng'),
            //origin: "11.004556,76.961632",
            destination: "chennai",
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    getLocation() {
        var x = document.getElementById("demo");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    getPosition(position) {

        var x = document.getElementById("demo");
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;

        localStorage.setItem('lat', position.coords.latitude);
        localStorage.setItem('lng', position.coords.longitude);

        var currentUserLatitude = position.coords.latitude;
        var currentUserLongitude = position.coords.longitude;

    }

    ngOnInit() {

        this.getLocation();

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


        this.activatedRoute.params.subscribe((params: Params) => {
            let eventId = params['eventId'];
            this.eventService.getEventDetail({ 'eventId': eventId }).subscribe(data => {
                this.event = data;
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;

                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: parseFloat(this.event.latitude), lng: parseFloat(this.event.longitude) },
                    zoom: 13
                });

                directionsDisplay.setMap(map);


                var input = document.getElementById('searchTextField');

                this.autocomplete = new google.maps.places.Autocomplete(input);

                this.autocomplete.bindTo('bounds', map);

                var service = new google.maps.DistanceMatrixService;
                service.getDistanceMatrix({
                    // origins: ["Coimbatore"],
                    origins: [localStorage.getItem('lat')+','+localStorage.getItem('lng')],
                    destinations: ["Chennai"],
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, function (response, status) {
                    console.log(response, status);
                    this.distance = response.rows["0"].elements["0"].distance.text;
                    this.timeTaken = response.rows["0"].elements["0"].duration.text;
                    console.log(this.distance, this.timeTaken)
                    document.getElementById('distance').innerHTML = this.distance;
                    document.getElementById('time').innerHTML = this.timeTaken;
                })

                this.calculateAndDisplayRoute(directionsService, directionsDisplay);


            },
                err => console.error(err),
                () => console.log('done loading'));

        });


    }

    editEvent() {

        console.log(event);
        this.updateEventTitle = this.event.eventName;
        this.updateEventDesc = this.event.description;
        this.updateEventDate = this.event.eventDate;
        this.updateEventLocation = this.event.location;
        this.eventId = this.event.eventId;
        this.updateEventCategory = this.event.categoryId;

    }

    updateEvent() {
        let data = {
            'eventName': this.updateEventTitle,
            'eventId': this.eventId,
            'categoryId': this.updateEventCategory,
            'location': this.autocomplete.gm_accessors_.place.dd.formattedPrediction,
            'eventDate': this.updateEventDate,
            'description': this.updateEventDesc
        }
        this.eventService.updateEvent(data).subscribe(data => {
            console.log(data);

        }, err => {
            console.log(err);
            //this.failureAlert = "Error While Updating Event";

        })


    }

    removeEvent() {

        let data = {
            'eventId': this.eventId,
        }
        this.eventService.removeEvent(data).subscribe(data => {
            console.log(data);
            // this.getAllEve();
        }, err => {
            console.log("Error removing event");
        })
    }



}
