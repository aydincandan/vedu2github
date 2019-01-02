import { Component, OnInit } from "@angular/core";
import { AuthService, _LUK } from "../_data/servisler/auth.service";
import { Router } from '@angular/router';
import { __Kisi } from '../_data/modeller/hepsi.model';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit { subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }
  get TokenExpireDate() { return localStorage.getItem("TokenExpireDate") }
  get IsTokenExpired() { return localStorage.getItem("IsTokenExpired") }
  get isAuthenticated() { return this.authService.TicketNotEXPIRED() }

  constructor(private authService: AuthService, private router: Router) { }

  loginUser: any = {};
  LoggedUserName: string;

  ngOnInit() {

    if (this.IsTokenExpired == "true") { this.logOut() }

    this.LoggedUserName = localStorage.getItem(_LUK)

    console.log("this.LoggedUserName:" + this.LoggedUserName)
    console.log("authService.getCurrentUserId:" + this.authService.getCurrentUserId())
    console.log("localStorage.getItem('IdE2'):" + localStorage.getItem("IdE2"))
    console.log("localStorage.getItem('TokenExpireDate'):" + this.TokenExpireDate)
    console.log("localStorage.getItem('IsTokenExpired'):" + this.IsTokenExpired)
    console.log("this.RoleNAME:" + this.RoleNAME)
    console.log("this.isAuthenticated:" + this.isAuthenticated)

  }

  loginsubmit() {
    localStorage.setItem(_LUK, this.loginUser.email)
    this.authService.KisiLogin(this.loginUser)
    this.LoggedUserName = localStorage.getItem(_LUK)
  }

  logOut() { this.authService.logOut() }

  appRefresh(): void { //document.location.href = 'http://localhost:4200' 
  }
}
