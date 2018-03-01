import { Component } from '@angular/core';
// import { LoginService } from './../services/login.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    name:string;
    password:string;

    // constructor(private loginService:LoginService) { }

    ngOnInit() {
        console.log("calls automatically");
    }

    login(){
        console.log("inside login function",this.name,this.password);
        // this.loginService.loginUser(this.name,this.password).subscribe(data => {
        //     console.log(data);
        //     window.alert("Success"); // used window.alert for demo purpose;
        // },
        //     err => console.error(err),
        //     () => console.log('done loading'));

    }
}
