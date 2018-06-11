import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './gamer/login/login.component';
import { NewGamerComponent } from './gamer/new-gamer/new-gamer.component';

import { EventComponent } from './event/event.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { NewEventComponent } from './event/new-event/new-event.component';

const routes: Routes = [
  { path: 'register', component: NewGamerComponent},
  { path: 'login', component: LoginComponent},
  { path: 'events', component: EventComponent},
  { path: 'event/new', component: NewEventComponent },
  { path: 'event/:id/edit', component: EventEditComponent},
  { path: 'event/:id', component: EventDetailsComponent},
  { path: '', redirectTo: '/events', pathMatch: 'full'}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {

}
