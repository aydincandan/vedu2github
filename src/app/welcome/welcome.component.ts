import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit { 
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }

  constructor() { }

  ngOnInit() {
    for(var i in localStorage) {
      console.log(i + ' = ' + localStorage[i]);
  }
  }

}
