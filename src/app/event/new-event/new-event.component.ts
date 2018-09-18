import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from '../../models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './new-event.component.html',
})
export class NewEventComponent implements OnInit {
  selectedEvent: Event;
  eventId: number;
  eventForm : FormGroup;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) {

    this.eventForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      startdate: new FormControl(this.getToday(), Validators.required),
      starttime: new FormControl('20:30:00', Validators.required),
      enddate: new FormControl(this.getToday(), Validators.required),
      endtime: new FormControl('23:59:00', Validators.required),
      org: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required),
    });
  }
  getToday(){
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    let strdd = ''
    let strmm = ''

    if (dd < 10) {
      strdd = '0'+dd;
    } else {
      strdd = ''+dd;
    }
    if (mm < 10) {
      strmm = '0'+mm;
    } else {
      strmm = ''+mm;
    }
    return yyyy+'-'+strmm+'-'+strdd
  }
  onSaveEvent(){
    let newEvent = new Event ()
    newEvent.id = this.eventForm.value.id;
    newEvent.name = this.eventForm.value.name;
    newEvent.startdate = this.eventForm.value.startdate + ' ' + this.eventForm.value.starttime;
    newEvent.enddate = this.eventForm.value.enddate + ' ' + this.eventForm.value.endtime;
    newEvent.org = this.eventForm.value.org;
    newEvent.place = this.eventForm.value.place;
    console.log(newEvent.enddate)
    this.eventService.newEvent(newEvent).subscribe(
      (data) => {
        this.notificationService.addNotification({
          title : 'Evento aggiunto', text : '', severity : 'success', id: 0
        });
        this.toggleEditMode()
      },
      (error) => {
        this.notificationService.addNotification({
          title : 'Errore durante l\'aggiunta', text : '', severity : 'critical', id: 0
        });
      }
    );

  }
  toggleEditMode(){
     this.router.navigate(['events']);
  }

  ngOnInit() {
  }

}
