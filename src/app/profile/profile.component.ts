import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../services/user.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    user: any;
    image:any;
    password:any;
    dropdownList:any;
    selectedItems:any;
    dropdownSettings:any;
    successInfo:boolean = false;
    
    constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Categories",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: "myclass custom-class"
        };

        this.userService.getUserDetails({ userId: localStorage.getItem('userId') }).subscribe(data => {
            console.log(data);
            this.user = data;
        }, err => {
            console.log(err);
        })
    }

    fileChangeListener($event) {
        let file = $event.target.files[0];
        const myReader: FileReader = new FileReader();
        const that = this;
        myReader.onloadend = (loadEvent: any) => {
            this.image = loadEvent.target.result;
        };
        myReader.readAsDataURL(file);
    }

    updateUser() {
        let user = {
            'userId':this.user.userId,
            'userName':this.user.userName,
            'password':this.password?this.password:this.user.password,
            'phone':this.user.phone,
            'image':this.image?this.image:this.user.image,
            'category':this.user.category,
            'distance':this.user.distance,
            'zipCode':this.user.zipCode,
            'description':this.user.description
        }
        
        
        
        console.log(user);
        
        this.userService.updateUser(user).subscribe(data => {
            console.log(data);
            this.user = data;
            this.successInfo = true;
        }, err => {
            console.log(err);
        })
        
    }



}
