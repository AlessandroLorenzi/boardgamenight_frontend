import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from '../../models';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
})
export class EventEditComponent implements OnInit {
  selectedEvent: Event;
  eventId: number;

  eventForm: FormGroup;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
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
        console.log(data);
        this.selectedEvent = data;
        this.eventForm = new FormGroup ({
          name: new FormControl(this.selectedEvent.name, Validators.required),
          startdate: new FormControl(this.selectedEvent.startdate, Validators.required),
          enddate: new FormControl(this.selectedEvent.enddate, Validators.required),
          org: new FormControl(this.selectedEvent.org, Validators.required),
          image: new FormControl(this.selectedEvent.image, Validators.required),
          place: new FormControl(this.selectedEvent.place, Validators.required)
        });
      },
      (error) => console.log(error)
    );
  }

  onSaveEvent(){
    this.eventService.editEvent(this.eventId, this.eventForm.value).subscribe(
      (data) => {
        this.toggleEditMode();
        this.notificationService.addNotification({
          title : 'Evento modificato', text : '', severity : 'success', id: 0
        });
      },
      (error) => {
        this.notificationService.addNotification({
          title : 'Errore durante la modifica' , text : '', severity : 'critical', id: 0
        });
      }
    );
  }
  toggleEditMode(){
     this.router.navigate(['..'], { relativeTo: this.route });
  }

  ngOnInit() {
  }

}
