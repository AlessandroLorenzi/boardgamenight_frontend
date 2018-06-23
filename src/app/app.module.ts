import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { AppRoutingModule } from './/app-routing.module';
import { EventDetailsComponent } from './event/event-details/event-details.component';

import { EventService } from './services/event.service';
import { GamerService } from './services/gamer.service';
import { NotificationService } from './services/notification.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { NewEventComponent } from './event/new-event/new-event.component';
import { NewGamerComponent } from './gamer/new-gamer/new-gamer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './gamer/login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';

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
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EventService, GamerService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
