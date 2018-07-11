import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { TableService } from '../../services/table.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event, Table } from '../../models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  providers: [EventService, TableService]
})
export class EventDetailsComponent implements OnInit {
  eventId: string;
  selectedEvent: Event;

  tableForm = new FormGroup ({
    game: new FormControl('', Validators.required)
  });;

  constructor(
    private eventService: EventService,
    private tableService: TableService,
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
        this.selectedEvent = data;
      },
      (error) => {
        this.returnToList();
      }
    );
  }

  deleteEvent(){
    this.eventService.deleteEvent(this.eventId).subscribe(
      (data) => {
        this.notificationService.addNotification({
          title : 'Evento eliminato', text : '', severity : 'success', id: 0
        });
        this.returnToList();
      },
      (error) => {
        this.notificationService.addNotification({
          title : 'Errore durante l\'eliminazione' , text : 'Riprova piú tardi', severity : 'critical', id: 0
        });
      }
    );

  }
  returnToList(){
     this.router.navigate(['events']);
  }

  addTable() {
    let table = new Table();
    table.game = this.tableForm.value.game;
    table.event_id = this.eventId;

    this.tableService.addTable(table).subscribe(
      (data) => {
        this.tableForm.reset();
        this.getEvent(this.eventId);
      },
      (error) => console.log(error)
    );

  }
  removeTable(table_id) {
    this.tableService.deleteTable(table_id).subscribe(
      (data) => {
        this.getEvent(this.eventId)
      },
      (error) => console.log(error)
    );
  }

  subscribe(table_id) {

    this.tableService.subscribe(table_id).subscribe(
      (data) => {
        this.getEvent(this.eventId);
      },
      (error) => console.log(error)
    );

  }
  unsubscribe(table_id) {
    this.tableService.unsubscribe(table_id).subscribe(
      (data) => {
        this.getEvent(this.eventId);
      },
      (error) => console.log(error)
    );
  }
  ngOnInit() {

  }

}
