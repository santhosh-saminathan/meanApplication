import { Component, ElementRef } from '@angular/core';
import { SignupService } from './../services/signup.service';
import { CloudinaryModule, Cloudinary, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    userName: any;
    email: any;
    password: any;
    confirmPassword: any;
    phoneNumber: any;
    zipCode: any;

    constructor(private cloudinary: Cloudinary, private router: Router,private signupService: SignupService, private elem: ElementRef) {

        console.log(cloudinary.cloudinaryInstance.image('sample'));
    }


    signUp() {
        console.log(this.userName,this.email,this.password,this.confirmPassword,this.phoneNumber,this.zipCode)
        if(this.password!=this.confirmPassword)
        window.alert("password and confirm password didn't match");

        if(!this.userName || !this.email || !this.password || !this.confirmPassword || !this.phoneNumber || !this.zipCode){
            window.alert("All fields are necessary")
        }else{
            let userObj = {
                'userName':this.userName,
                'email':this.email,
                'password':this.password,
                'phoneNumber':this.phoneNumber,
                'zipCode':this.zipCode
            }
            this.signupService.signupUser(userObj).subscribe();
        }
    }

    backToLogin(){
        this.router.navigate(['/login'])

    }

    // public uploadImage(): void {
    //     let files = this.elem.nativeElement.querySelector('#selectFile').files;
    //     console.log(files);
    //     let form_Data = new FormData();
    //     let file = files[0];
    //     console.log(file);
    //     // form_Data.append('file', file, file.name);
    //     // console.log(file);
    //     form_Data.append('avatar', file, file.name);
    //     this.signupService.upload(form_Data).subscribe(data => {
    //         console.log(data);
    //         //window.alert("Success"); // used window.alert for demo purpose;
    //     },
    //         err => console.error(err),
    //         () => console.log('done loading'));; 
    //   }



}
