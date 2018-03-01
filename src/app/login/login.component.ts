import { Component } from '@angular/core';
import { LoginService } from './../services/login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    name:string;
    password:string;

    constructor(private loginService:LoginService,private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        console.log("calls automatically");
    }

    login(){
        console.log("inside login function",this.name,this.password);
        this.loginService.loginUser(this.name,this.password).subscribe(data => {
            console.log(data);
            window.alert("Success"); // used window.alert for demo purpose;
        },
            err => console.error(err),
            () => console.log('done loading'));

    }

    register(){
        this.router.navigate(['/signup'])

    }
}
