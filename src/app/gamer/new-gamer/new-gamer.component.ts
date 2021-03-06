import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamerService } from '../../services/gamer.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Gamer } from '../../models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-new-gamer',
  templateUrl: './new-gamer.component.html',
  styleUrls: ['./new-gamer.component.css']
})
export class NewGamerComponent implements OnInit {
  gamerForm = new FormGroup ({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repassword: new FormControl('', Validators.required),
    email: new FormControl('')
  });

  passwordMismatched = false;
  gamerSaved = false;

  constructor(
    private gamerService: GamerService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }
  newGamer(){
    if (this.gamerForm.value['password'] != this.gamerForm.value['repassword']) {
      this.passwordMismatched = true;
      return(null);
    }
    let newGamer = new Gamer();
    newGamer.username =  this.gamerForm.value.username;
    newGamer.password =  this.gamerForm.value.password;
    newGamer.email =  this.gamerForm.value.email;
    this.gamerService.addGamer(newGamer).subscribe(
      (data)=> {
        this.router.navigate(['/']);
        this.notificationService.addNotification({
          title : 'Utente Creato', text : '', severity : 'success', id: 0
        })
      },
      (error)=> {
        this.notificationService.addNotification({
          title : 'Errore', text : 'impossibile creare l\'utente', severity : 'alert', id: 0
        })
      }
    );
  }

}
