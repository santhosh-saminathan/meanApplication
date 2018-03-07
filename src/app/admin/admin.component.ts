import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './../services/admin.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    newEvents:any = [];
    allUsers:any = [];
   
    constructor(private router: Router,private adminService:AdminService) { }

    ngOnInit() {
        console.log("calls automatically");

        this.adminService.getNewEvents().subscribe(data=>{
            console.log(data);
            this.newEvents = data;
        },err=>{
            console.log(err);
        })

        this.adminService.getAllUsers().subscribe(data=>{
            console.log(data);
            this.allUsers = data;
        },err=>{
            console.log(err);
        })
    }

    approveEvent(eventId){
        this.adminService.approveEvent({'eventId':eventId}).subscribe(data=>{
            console.log(data);
        },err=>{
            console.log(err);
        })
    }

    deleteUser(userId){
        this.adminService.deleteUser({'userId':userId}).subscribe(data=>{
            console.log(data);
        },err=>{
            console.log(err);
        })
    }

}
