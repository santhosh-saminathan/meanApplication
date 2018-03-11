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
    userId:any;
    errorData:any;

    constructor(private loginService:LoginService,private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        console.log("calls automatically");
    }

    login(){
        console.log("inside login function",this.name,this.password);
        if(this.name && this.password){
            let data = {
                'userEmail':this.name,
                'password':this.password
            }
            this.loginService.loginUser(data).subscribe(data => {
                this.userId = data;
                localStorage.setItem('userId',this.userId)
                this.router.navigate(['/events'])
            },(error)=>{
                console.log(error)
                this.errorData = error.error.data;
            })
        }else{
            this.errorData = "Please Enter Email and Password";
        }
    }

    register(){
        this.router.navigate(['/signup'])

    }

    createAdmin(){
        this.loginService.createAdmin({'userEmail':'admin','password':'admin'}).subscribe(data=>{
            console.log(data);
            window.alert("Admin created successfully");
        },err=>{
            window.alert(err.error.data);
            console.log(err);
        })
    }
}
