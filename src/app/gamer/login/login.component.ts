import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamerService } from '../../services/gamer.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Gamer } from '../../models';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup ({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private gamerService: GamerService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,

  ) { }

  ngOnInit() {
  }

  login(){
    let login = new Gamer()
    login.username = this.loginForm.value['username'];
    login.password = this.loginForm.value['password'];
    this.gamerService.login(login).then(
      (data) => {
        this.notificationService.addNotification({
          title : 'Benvenuto', text : 'Login effettuato', severity : 'alert', id: 0
        });
        this.router.navigate(['/']);
      },
      (error) => {
        this.notificationService.addNotification({
          title : 'Errore', text : 'Utente o password errati', severity : 'alert', id: 0
        })
      }
    );
  }

}
