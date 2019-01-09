import { Component, OnInit } from '@angular/core';
import { AuthService, _LUK } from "../_data/servisler/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit { 
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }
  get isAuthenticated() { return this.authService.TicketNotEXPIRED() }

  constructor(private authService:AuthService) { }

  ngOnInit() {
    for(var i in localStorage) {
      console.log(i + ' = ' + localStorage[i]);
  }
  }

}
