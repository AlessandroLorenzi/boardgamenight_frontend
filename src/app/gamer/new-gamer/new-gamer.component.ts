import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamerService } from '../../services/gamer.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Gamer } from '../../models';

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
        this.gamerSaved = true;
        setTimeout(
          () => { this.router.navigate(['/']); },
          500
        )
      },
      (error)=> {console.log(error.error.message);}
    );
  }

}
