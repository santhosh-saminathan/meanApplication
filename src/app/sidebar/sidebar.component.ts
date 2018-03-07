import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../services/user.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    url:any;
    highlightHome:boolean=false;
    highlightCreateEvent:boolean=false;
    highlightCategory:boolean=false;
    highlightAdmin:boolean=false;
    pageTitle:any;
    creatorAccess:boolean=false;
  
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService:UserService) { }

    ngOnInit() {
        console.log("calls automatically");
        this.url = this.router.url;
        console.log(this.url);
        if (this.url === '/events') {
            this.highlightHome = true;
            this.pageTitle = "Discover Events"
        } else if (this.url === '/createEvent') {
            this.highlightCreateEvent = true;
            this.pageTitle = "Create Events"
        } else if (this.url === '/category') {
            this.highlightCategory = true;
            this.pageTitle = "Category List"
        } else if (this.url === '/admin'){
            this.highlightAdmin = true;
            this.pageTitle = "Admin"
        }

        this.userService.getUserType({'userId':localStorage.getItem('userId')}).subscribe(data => {
            console.log(data);
            if(data === 'normal'){
                this.creatorAccess = false;
            }else if(data === 'admin' || data === 'creator'){
                this.creatorAccess = true;
            }
        },
            err => {
                console.log(err);
              
            });

    }

    categories(){
        this.highlightHome = false;
        this.highlightCreateEvent = false;
        this.highlightAdmin = false;
        this.router.navigate(['/category']);
    }

    home(){
        this.highlightCategory = false;
        this.highlightCreateEvent = false;
        this.highlightAdmin = false;
        this.router.navigate(['/events']);
    }

    createEvent(){
        this.highlightCategory = false;
        this.highlightHome = false;
        this.highlightAdmin = false;
        this.router.navigate(['/createEvent']);
    }

    admin(){
        this.highlightCategory = false;
        this.highlightHome = false;
        this.highlightCreateEvent = false;
        this.router.navigate(['/admin']);
    }

    logout(){
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
    }
}
