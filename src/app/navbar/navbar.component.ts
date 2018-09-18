import { Gamer } from '../models';
import { Component, OnInit } from '@angular/core';
import { GamerService } from '../services/gamer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Gamer;
  constructor(
    private gamerService: GamerService,
  ) {
    this.gamerService.loggedInUser.subscribe(
      username => this.set_username(username)
    )
  }
  set_username(user){
    this.user = user;
  }
  ngOnInit() {
  }
  logout(){
    this.gamerService.logout();
  }

}
