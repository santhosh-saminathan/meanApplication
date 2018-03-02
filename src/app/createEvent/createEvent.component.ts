import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from './../services/events.service';

@Component({
  selector: 'createEvent',
  templateUrl: './createEvent.component.html',
  styleUrls: ['./createEvent.component.css']
})
export class CreateEventComponent {
    eventTitle:any;
    eventCategory:any;
    eventLocation:any;
    eventDate:any;
    eventDesc:any;
   
    constructor(private router: Router,private eventService:EventService) { }

    ngOnInit() {
        console.log("calls automatically");
    }

    createEvent(){
        console.log(this.eventTitle,this.eventCategory,this.eventDate,this.eventLocation,this.eventDesc);
        let event = {
            'userId':localStorage.getItem('userId'),
            'eventName':this.eventTitle,
            'categoryId':this.eventCategory,
            'description':this.eventDesc,
            'location':this.eventLocation
        }
        this.eventService.createEvent(event).subscribe(data => {
            console.log(data);
        },
            err => console.error(err),
            () => console.log('done loading'));
    }

}
