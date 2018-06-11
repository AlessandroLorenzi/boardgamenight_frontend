import { Injectable } from '@angular/core';
import { Event, Table, Gamer } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GamerService {
  constructor(
    private http: HttpClient
  ) { }
  private access_token: string;
  private refresh_token: string;
  private refresh_token_timer;

  private gamerUrl = 'http://localhost:5000/v1/gamer/';
  private authUrl = 'http://localhost:5000/auth';
  private refreshUrl = 'http://localhost:5000/refresh';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  deleteGamer (id) {
    return this.http.delete(this.gamerUrl + id);
  }
  addGamer (newGamer:Gamer) {
    return this.http.post(this.gamerUrl + '0', newGamer, this.httpOptions);
  }
  login (login:Gamer) {
    return this.http.post(this.authUrl, login, this.httpOptions);
  }
  handle_jwt(jwt){
    this.refresh_token = jwt.refresh_token;
    this.update_access_token(jwt.access_token);
    this.refresh_token_timer =
      setInterval(()=>{this.refresh_jwt()},5*1000*60);
  }

  refresh_jwt() {
    console.log(this.refresh_token);
    let refreshHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ this.refresh_token
      })
    };

    this.http.post(this.refreshUrl, {}, refreshHttpOptions
      ).subscribe(
      (data) =>
      {
        console.log(data);
        this.update_access_token(data['access_token']);
      },
      (data) => console.log(data)
    );
  }

  update_access_token(access_token:string){
    this.access_token = access_token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ this.access_token
      })
    };
  }

  logout(){
    clearTimeout(this.refresh_token_timer);
    this.access_token = '';
    this.refresh_token = '';
  }
}
