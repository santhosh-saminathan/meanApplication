import { Component,ElementRef } from '@angular/core';
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
   
    constructor(private router: Router,private eventService:EventService,private elem: ElementRef) { }

    ngOnInit() {
        console.log("calls automatically");
    }

    createEvent(){
        console.log(this.eventTitle,this.eventCategory,this.eventDate,this.eventLocation,this.eventDesc);

        let files = this.elem.nativeElement.querySelector('#selectFile').files;
        console.log(files);
        let form_Data = new FormData();
        let file = files[0];
        console.log(file);
        form_Data.append('file', file, file.name);
        console.log(file);

        let event = {
            'userId':localStorage.getItem('userId'),
            'eventName':this.eventTitle,
            'categoryId':this.eventCategory,
            'description':this.eventDesc,
            'location':this.eventLocation,
            'formData':form_Data
        }
        this.eventService.createEvent(event).subscribe(data => {
            this.router.navigate(['/events']);
            console.log(data);
            
        },
            err => console.error(err),
            () => console.log('done loading'));
    }


}
