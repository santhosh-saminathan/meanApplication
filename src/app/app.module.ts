import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
 import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';


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
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';


const appRoutes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'events', component: SidebarComponent},
  { path: 'createEvent', component: SidebarComponent},
  { path: 'category', component: SidebarComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EventComponent,
    SidebarComponent,
    CreateEventComponent,
    CategoryComponent
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