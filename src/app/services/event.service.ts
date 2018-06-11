import { Injectable } from '@angular/core';
import { Event, Table, Gamer } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {
  constructor(
    private http: HttpClient
  ) { }
  private eventsUrl = 'http://localhost:5000/v1/events';
  private eventUrl = 'http://localhost:5000/v1/event/';
  private pingUrl = 'http://localhost:5000/v1/ping';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getEventList () : Observable<Event[]>{
    return this.http.get<Event[]>(this.eventsUrl)
  }

  getEvent (id:string) : Observable<Event> {
    return this.http.get<Event>(this.eventUrl + id);
  }

  editEvent (id, editedEvent:Event) {
    return this.http.put(this.eventUrl + id, editedEvent, this.httpOptions);
  }
  deleteEvent (id) {
    return this.http.delete(this.eventUrl + id);
  }
  newEvent (newEvent:Event) {
    return this.http.post(this.eventUrl + '0', newEvent, this.httpOptions);
  }
}
