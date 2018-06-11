import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamerService } from '../../services/gamer.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Gamer } from '../../models';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    let login = new Gamer()
    login.username = this.loginForm.value['username'];
    login.password = this.loginForm.value['password'];
    this.gamerService.login(login).then(
      (data) => {
        this.router.navigate(['/']);
        console.log('OK');
      }
    );
  }

}
