import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { TableService } from '../../services/table.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Event, Table } from '../../models';

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
      },
      (error) => {
        this.returnToList();
      }
    );
  }

  deleteEvent(){
    this.eventService.deleteEvent(this.eventId).subscribe(
      (data) => {
        this.returnToList();
      },
      (error) => console.log(error)
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
  ngOnInit() {

  }

}
