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


    constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) { }
    event: any;

    ngOnInit() {

        // var map = new google.maps.Map(document.getElementById('map'), {
        //   zoom: 4,
        //   center: uluru
        // });
        this.activatedRoute.params.subscribe((params: Params) => {
            let eventId = params['eventId'];
            console.log(eventId);
            this.eventService.getEventDetail({ 'eventId': eventId }).subscribe(data => {
                console.log(data);
                this.event = data;
                console.log(this.event.latitude, this.event.longitude)


                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: parseFloat(this.event.latitude), lng: parseFloat(this.event.longitude) },
                    zoom: 13
                });
                var marker = new google.maps.Marker({
                    position: { lat: parseFloat(this.event.latitude), lng: parseFloat(this.event.longitude) },
                    map: map
                });
                var input = document.getElementById('searchTextField');

                this.autocomplete = new google.maps.places.Autocomplete(input);

                this.autocomplete.bindTo('bounds', map);

            },
                err => console.error(err),
                () => console.log('done loading'));

          });

      
    }
    location = {};
    setPosition(position) {
        this.location = position.coords;
        console.log(position.coords);
    }



}
