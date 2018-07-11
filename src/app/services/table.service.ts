import { Injectable } from '@angular/core';
import { Event, Table, Gamer } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { GamerService } from './gamer.service';

@Injectable()
export class TableService {
  constructor(
    private http: HttpClient,
    private gamerService: GamerService,
  ) { }
  private apiUrl = environment.apiUrl;

  private tableUrl = this.apiUrl + '/table/';

  deleteTable (id) {
    return this.http.delete(this.tableUrl + id, this.gamerService.httpOptions);
  }
  addTable (newTable:Table) {
    return this.http.post(this.tableUrl + '0', newTable, this.gamerService.httpOptions);
  }

  subscribe (id){
    return this.http.post(this.tableUrl + id + '/subscribe', {}, this.gamerService.httpOptions);
  }
  unsubscribe (id){
    return this.http.delete(this.tableUrl +  id + '/subscribe', this.gamerService.httpOptions);
  }
}
