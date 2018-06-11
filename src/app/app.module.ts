import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { AppRoutingModule } from './/app-routing.module';
import { EventDetailsComponent } from './event/event-details/event-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { NewEventComponent } from './event/new-event/new-event.component';
import { NewGamerComponent } from './gamer/new-gamer/new-gamer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './gamer/login/login.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventDetailsComponent,
    EventEditComponent,
    NewEventComponent,
    NewGamerComponent,
    NavbarComponent,
    LoginComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
