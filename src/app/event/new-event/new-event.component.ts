import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from '../../models';

@Component({
  selector: 'app-event-edit',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
})
export class NewEventComponent implements OnInit {
  selectedEvent: Event;
  eventId: number;
  eventSaved = false;
  eventForm = new FormGroup ({
    name: new FormControl('', Validators.required),
    startdate: new FormControl('', Validators.required),
    starttime: new FormControl('', Validators.required),
    enddate: new FormControl('', Validators.required),
    endtime: new FormControl('', Validators.required),
    org: new FormControl('', Validators.required),
    place: new FormControl('', Validators.required),
  });;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  onSaveEvent(){
    let newEvent = new Event ()
    newEvent.id = this.eventForm.value.id;
    newEvent.name = this.eventForm.value.name;
    newEvent.startdate = this.eventForm.value.startdate + ' ' + this.eventForm.value.starttime;
    newEvent.enddate = this.eventForm.value.enddate + ' ' + this.eventForm.value.endtime;
    newEvent.org = this.eventForm.value.org;
    newEvent.place = this.eventForm.value.place;

    this.eventService.newEvent(newEvent).subscribe(
      (data) => {
        this.eventSaved = true;
        setTimeout(
          () => { this.toggleEditMode() },
          500
        )
      },
      (error) => console.log(error)
    );

  }
  toggleEditMode(){
     this.router.navigate(['events']);
  }

  ngOnInit() {
  }

}
