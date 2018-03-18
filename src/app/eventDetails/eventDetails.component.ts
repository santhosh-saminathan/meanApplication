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
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) {

    }
    autocomplete: any;
    event: any;
    updateEventTitle: any;
    updateEventDesc: any;
    updateEventDate: any;
    updateEventLocation: any;
    eventId: any;
    updateEventCategory: any;
    dropdownList: any;
    dropdownSettings: any;
    enableEdit: boolean = false;

    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        if (localStorage.getItem('lat') && localStorage.getItem('lng')) {
            document.getElementById('data').innerHTML = "Distance is based on user current location";
            directionsService.route({
                origin: localStorage.getItem('lat') + ',' + localStorage.getItem('lng'),
                destination: this.event.location,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        } else {
            document.getElementById('data').innerHTML = "Distance is based on user zip code";
            directionsService.route({
                origin: this.event.creatorDetails.zipCode,
                destination: this.event.location,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getPosition);
        } else {
            console.error("Geolocation not supported by browser.Check Html5 W3C documentation")
        }
    }

    getPosition(position) {
        localStorage.setItem('lat', position.coords.latitude);
        localStorage.setItem('lng', position.coords.longitude);
    }

    successCallback(data) {
        console.log(data);
    }
    errorCallback(data) {
        console.log(data);
    }

    ngOnInit() {
        navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback, { timeout: 10000 });

        localStorage.removeItem('lat');
        localStorage.removeItem('lng');
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
                if (this.event.userId === localStorage.getItem('userId')) {
                    this.event.editable = true;
                }
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
                    origins: [localStorage.getItem('lat') ? localStorage.getItem('lat') + ',' + localStorage.getItem('lng') : this.event.creatorDetails.zipCode],
                    destinations: [this.event.location],
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, function (response, status) {
                    let eventDis = response.rows[0].elements[0].distance.text.replace(",", "")
                    let miles = (parseInt(eventDis.split(" ")[0]) * 0.621371);
                    document.getElementById('miles').innerHTML = miles.toString()+' Miles';
                    document.getElementById('distance').innerHTML = response.rows["0"].elements["0"].distance.text;
                    document.getElementById('time').innerHTML = response.rows["0"].elements["0"].duration.text;
                })
                this.calculateAndDisplayRoute(directionsService, directionsDisplay);
            },
                err => console.error(err),
                () => console.log('done loading'));
        });
    }

    editEvent() {
        this.updateEventTitle = this.event.eventName;
        this.updateEventDesc = this.event.description;
        this.updateEventDate = this.event.eventDate;
        this.updateEventLocation = this.event.location;
        this.eventId = this.event.eventId;
        this.updateEventCategory = this.event.categoryId;
        this.enableEdit = true;
    }

    updateEvent() {
        console.log(this.autocomplete, this.updateEventLocation);
        let data = {
            'eventName': this.updateEventTitle,
            'eventId': this.eventId,
            'categoryId': this.updateEventCategory,
            'location': this.autocomplete.gm_accessors_.place.fd.formattedPrediction ? this.autocomplete.gm_accessors_.place.fd.formattedPrediction : this.updateEventLocation,
            'eventDate': this.updateEventDate,
            'description': this.updateEventDesc
        }
        this.eventService.updateEvent(data).subscribe(data => {
            this.enableEdit = false;
            this.ngOnInit();
        }, err => {
            console.log(err);
        });
    }

}
