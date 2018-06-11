import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from '../../models';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
})
export class EventEditComponent implements OnInit {
  selectedEvent: Event;
  eventId: number;

  eventForm: FormGroup;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.route.params.subscribe(
      params => {
        this.eventId = params['id'];
        this.getEvent(params['id'])
      }
    );
  }
  getEvent(id: string){
    this.eventService.getEvent(id).subscribe(
      (data) => {
        this.selectedEvent = data;
        this.eventForm = new FormGroup ({
          name: new FormControl(this.selectedEvent.name, Validators.required),
          startdate: new FormControl(this.selectedEvent.startdate, Validators.required),
          enddate: new FormControl(this.selectedEvent.enddate, Validators.required),
          org: new FormControl(this.selectedEvent.org, Validators.required),
          place: new FormControl(this.selectedEvent.place, Validators.required),
        });
      },
      (error) => console.log(error)
    );
  }

  onSaveEvent(){
    this.eventService.editEvent(this.eventId, this.eventForm.value).subscribe(
      (data) => {
        this.toggleEditMode();
      },
      (error) => console.log(error)
    );
  }
  toggleEditMode(){
     this.router.navigate(['..'], { relativeTo: this.route });
  }

  ngOnInit() {
  }

}
