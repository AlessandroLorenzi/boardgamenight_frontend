import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from '../models';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  eventList: Event[] = [];

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventService.getEventList().subscribe(
      (data) => {
        this.eventList =  data['events'];
      },
      (error) => console.log(error)
    );
  }
  newEvent(){
    this.router.navigate(['event/new']);
  }
}
