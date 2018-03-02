import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
   
    constructor(private router: Router) { }

    ngOnInit() {
        console.log("calls automatically");
    }

}
