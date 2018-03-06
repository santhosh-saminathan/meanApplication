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
   

    constructor(private router: Router, private eventService: EventService) { }

    ngOnInit() {

       
    }

    

}
