import { Injectable } from '@angular/core';
import { Event, Table, Gamer } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from 'environments/environment';

@Injectable()
export class GamerService {
  constructor(
    private http: HttpClient
  ) { }
  private apiUrl = environment.apiUrl;

  loggedInUser = new Subject();

  private access_token: string;
  private refresh_token: string;
  private refresh_token_timer;

  private gamerUrl = this.apiUrl + '/gamer/';
  private authUrl = this.apiUrl + '/auth';
  private refreshUrl = this.apiUrl + '/refresh';

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
    return new Promise<string>(
      (resolve,reject) => {
        this.http.post(this.authUrl, login, this.httpOptions).subscribe(
          (data) => {
            this.handle_jwt(data);
            this.loggedInUser.next(login.username);
            resolve("ok");
          },
          (error) => reject("No login")
        )
      }
    );
  }

  handle_jwt(jwt){
    this.refresh_token = jwt.refresh_token;
    this.update_access_token(jwt.access_token);
    this.refresh_token_timer =
      setInterval(()=>{this.refresh_jwt()},5*1000*60);
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
    this.update_access_token('');
    this.refresh_token = '';
    this.loggedInUser.next(null);
  }
}
