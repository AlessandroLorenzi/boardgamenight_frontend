import { Injectable } from '@angular/core';
import { Event, Table, Gamer } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { GamerService } from './gamer.service';

@Injectable()
export class EventService {
  constructor(
    private http: HttpClient,
    private gamerService: GamerService,
  ) { }
  private apiUrl = environment.apiUrl;

  private eventsUrl = this.apiUrl + '/events';
  private eventUrl = this.apiUrl + '/event/';



  getEventList () : Observable<Event[]>{
    return this.http.get<Event[]>(this.eventsUrl)
  }

  getEvent (id:string) : Observable<Event> {
    return this.http.get<Event>(this.eventUrl + id);
  }

  editEvent (id, editedEvent:Event) {
    return this.http.put(this.eventUrl + id, editedEvent, this.gamerService.httpOptions);
  }
  deleteEvent (id) {
    return this.http.delete(this.eventUrl + id, this.gamerService.httpOptions);
  }
  newEvent (newEvent:Event) {
    console.log(this.gamerService.httpOptions);
    return this.http.post(this.eventUrl + '0', newEvent, this.gamerService.httpOptions);
  }
}
