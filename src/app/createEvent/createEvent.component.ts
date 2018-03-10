import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from './../services/events.service';
declare let google: any;

@Component({
    selector: 'createEvent',
    templateUrl: './createEvent.component.html',
    styleUrls: ['./createEvent.component.css']
})
export class CreateEventComponent {
    eventTitle: any;
    eventCategory: any;
    eventLocation: any;
    eventDate: any;
    eventDesc: any;
    autocomplete: any;
    image: any;
    fieldsMissing:boolean = false;

    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    message:any;

    constructor(private router: Router, private eventService: EventService, private elem: ElementRef) { }

    ngOnInit() {

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
        this.selectedItems = [];
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Categories",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: "myclass custom-class"
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -33.8688, lng: 151.2195 },
            zoom: 13
        });
        var input = document.getElementById('searchTextField');

        this.autocomplete = new google.maps.places.Autocomplete(input);

        this.autocomplete.bindTo('bounds', map);

    }

    onItemSelect(item: any) {
        // console.log(item);
        // console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        // console.log(item);
        // console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        // console.log(items);
    }
    onDeSelectAll(items: any) {
        // console.log(items);
    }

    public fileChangeListener($event) {
        let file = $event.target.files[0];
        const myReader: FileReader = new FileReader();
        const that = this;
        myReader.onloadend = (loadEvent: any) => {
            this.image = loadEvent.target.result;
            //console.log('file load', loadEvent.target.result);
        };
        myReader.readAsDataURL(file);
    }

    createEvent() {

        if (this.eventTitle && this.selectedItems && this.eventDesc && this.autocomplete.gm_accessors_.place.dd.formattedPrediction && this.eventDate && this.image) {
            this.fieldsMissing = false;
            let event = {
                'userId': localStorage.getItem('userId'),
                'eventName': this.eventTitle,
                'categoryId': this.selectedItems,
                'description': this.eventDesc,
                'location': this.autocomplete.gm_accessors_.place.dd.formattedPrediction,
                'eventDate': this.eventDate,
                'image': this.image
            }
            this.eventService.createEvent(event).subscribe(data => {
                this.message = "Event Created Successfully. Events will display in Events page after Admin approves Event";
                //this.router.navigate(['/events']);
                //console.log(data);

            },err => {
                //this.message = "Failed to create Event";
                    console.log(err);
                });
        }else{
            this.fieldsMissing = true;
        }


    }


}
