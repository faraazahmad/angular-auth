import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  username: string;
  password: string;

  show: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.username + ' ' + this.password);
  }

  toggle() {
    this.show = !this.show;
  }

}
