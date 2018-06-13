import { Injectable } from '@angular/core';
import { Event, Table, Gamer } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class TableService {
  constructor(
    private http: HttpClient
  ) { }
  private apiUrl = environment.apiUrl;

  private tableUrl = this.apiUrl + '/table/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  deleteTable (id) {
    return this.http.delete(this.tableUrl + id);
  }
  addTable (newTable:Table) {
    return this.http.post(this.tableUrl + '0', newTable, this.httpOptions);
  }
}
