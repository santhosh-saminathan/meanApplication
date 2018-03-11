import { Component, ElementRef } from '@angular/core';
import { SignupService } from './../services/signup.service';
import { CloudinaryModule, Cloudinary, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

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
    userType: any;
    imageId: string;
    errorData: String;

    constructor(private router: Router, private signupService: SignupService) {
    }

    signUp() {
        if (this.userName && this.email && this.userType && this.password && this.confirmPassword && this.phoneNumber && this.zipCode) {
            if (this.password === this.confirmPassword) {
                let userObj = {
                    'userName': this.userName,
                    'email': this.email,
                    'password': this.password,
                    'phoneNumber': this.phoneNumber,
                    'zipCode': this.zipCode,
                    'userType': this.userType
                }
                this.signupService.signupUser(userObj).subscribe(data => {
                    this.router.navigate(['/login'])
                },
                    err => {
                        console.log(err.error.data);
                        this.errorData = err.error.data;
                    });
            } else {
                this.errorData = "Password and Confirm Password not matching";
            }
        } else {
            this.errorData = "All Fields are necessary for signup";
        }
    }

    backToLogin() {
        this.router.navigate(['/login'])

    }



}