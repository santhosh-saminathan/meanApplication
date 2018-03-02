import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


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
    pageTitle:any;
  
    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

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
        }
    }

    categories(){
        this.highlightHome = false;
        this.highlightCreateEvent = false;
        this.router.navigate(['/category']);
    }

    home(){
        this.highlightCategory = false;
        this.highlightCreateEvent = false;
        this.router.navigate(['/events']);
    }

    createEvent(){
        this.highlightCategory = false;
        this.highlightHome = false;
        this.router.navigate(['/createEvent']);
    }

    logout(){
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
    }
}
