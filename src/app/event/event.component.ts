import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../services/event.service';
import { GamerService } from '../services/gamer.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from '../models';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit, OnDestroy {
  eventList: Event[] = [];
  username: string;
  loggedInUser ;
  constructor(
    private eventService: EventService,
    private gamerService: GamerService,
    private router: Router
  ) {
    this.eventService.getEventList().subscribe(
      (data) => {
        this.eventList =  data['events'];
      },
      (error) => console.log(error)
    );
    this.loggedInUser = this.gamerService.loggedInUser.subscribe(
      (username) => {this.username = username}
    )

  }
  ngOnDestroy(){
    this.loggedInUser.unsubscribe()
  }
  ngOnInit() {

  }
  newEvent(){
    this.router.navigate(['event/new']);
  }
}
