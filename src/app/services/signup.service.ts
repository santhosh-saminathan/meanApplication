import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class SignupService {
  constructor(private http: HttpClient) { }

  upload(data){
      return this.http.post("https://api.cloudinary.com/v1_1/santhosh001/image/upload",
      {file:"http://www.gstatic.com/webp/gallery/4.jpg", timestamp:"1519899602111",api_key:"185572413157711",signature:"de711c75472aabffd3c503973bd636dbdeee378c"});
  }

  signupUser(data){
    return this.http.post("http://localhost:3000/signup",data)  }

}