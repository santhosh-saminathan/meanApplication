import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { EventComponent } from './events/events.component';
import { CategoryComponent } from './category/category.component';
import { CreateEventComponent } from './createEvent/createEvent.component';
import { EventService } from './services/events.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventDetailsComponent } from './eventDetails/eventDetails.component';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { UserService } from './services/user.service';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './services/admin.service';
import {ProfileComponent} from './profile/profile.component';

const appRoutes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'events', component: SidebarComponent },
  { path: 'createEvent', component: SidebarComponent },
  { path: 'category', component: SidebarComponent },
  { path: 'admin', component: SidebarComponent },
  { path: 'profile', component: SidebarComponent },
  { path: 'event/details/:eventId', component: EventDetailsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EventComponent,
    SidebarComponent,
    CreateEventComponent,
    CategoryComponent,
    EventDetailsComponent,
    AdminComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Ng2CloudinaryModule,
    AngularMultiSelectModule,
    FileUploadModule,
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [LoginService, SignupService, EventService, UserService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }