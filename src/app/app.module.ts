import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { EventComponent } from './events/events.component';
import { EventService } from './services/events.service';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';


const appRoutes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'events', component:EventComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [LoginService,SignupService,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }