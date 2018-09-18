import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../services/event.service';
import { GamerService } from '../services/gamer.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event, Gamer } from '../models';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit, OnDestroy {
  eventList: Event[] = [];
  user: Gamer;
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
      (gamer) => {this.user = gamer;}
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
