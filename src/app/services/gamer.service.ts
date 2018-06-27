import { Injectable } from '@angular/core';
import { Event, Table, Gamer } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';

@Injectable()
export class GamerService {
  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
      this.internal_login(
        localStorage.getItem('refresh_token'),
        localStorage.getItem('access_token')
      )
    }
  }
  private apiUrl = environment.apiUrl;

  loggedInUser = new BehaviorSubject<string>(null);

  private access_token: string;
  private refresh_token: string;
  private refresh_token_timer;

  private gamerUrl = this.apiUrl + '/gamer/';
  private authUrl = this.apiUrl + '/auth';
  private refreshUrl = this.apiUrl + '/refresh';
  private whoami = this.apiUrl + '/whoami';

  httpOptions = {
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
    return new Promise<string>(
      (resolve,reject) => {
        this.http.post(this.authUrl, login, this.httpOptions).subscribe(
          (data:{'refresh_token': string, 'access_token': string}) => {
            this.internal_login(data.refresh_token, data.access_token);
            resolve("ok");
          },
          (error) => reject("No login")
        )
      }
    );
  }

  internal_login(refresh_token, access_token){
    this.refresh_token = refresh_token;
    localStorage.setItem('refresh_token', refresh_token);

    this.update_access_token(access_token);

    this.refresh_token_timer =
      setInterval(()=>{this.refresh_jwt()},5*1000*60);

    this.http.get(this.whoami, this.httpOptions
      ).subscribe(
      (data) =>
      {
        this.loggedInUser.next(data['username']);
      },
      (data) => console.log(data)
    );
  }

  refresh_jwt() {
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
        this.update_access_token(data['access_token']);
      },
      (data) => console.log(data)
    );
  }

  update_access_token(access_token:string){
    localStorage.setItem('access_token', access_token);
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

    this.refresh_token = null;
    localStorage.removeItem('refresh_token');

    this.access_token = null;
    localStorage.removeItem('access_token');

    this.loggedInUser.next(null);
  }
}
