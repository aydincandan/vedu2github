import { Component, OnInit } from "@angular/core";
import { AuthService, _LUK } from "../_data/servisler/auth.service";
import { Router } from '@angular/router';
import { __Kisi } from '../_data/modeller/hepsi.model';
import { AlertifyService } from '../_data/servisler/alertify.service';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }
  get TokenExpireDate() { return localStorage.getItem("TokenExpireDate") }
  get IsTokenExpired() { return localStorage.getItem("IsTokenExpired") }
  get isAuthenticated() { return this.authService.TicketNotEXPIRED() }

  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) { }

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
      .subscribe(data => {
        console.log("data => " + JSON.stringify(data));
        this.authService.saveToken(data);
        this.authService.userToken = data;
        this.authService.decodedToken = this.authService.jwtHelper.decodeToken(data.toString());

        this.alertifyService.success("auth.service Sisteme giriş(" + localStorage.getItem(_LUK) + ") yapıldı(" + this.authService.getCurrentUserId() + ")");

        // username ve userID burda mevcut ve aşağıdaki gibi de yakaladık
        let ccc: __Kisi[]
        this.authService.getLoggedKisi().subscribe(data => {
          console.log("data => " + JSON.stringify(data));
          ccc = data
          localStorage.setItem("RoleNAME", data[0].KISITIPI)
          localStorage.setItem("IdE2", data[0].IdE.toString())
          localStorage.setItem("TokenExpireDate", this.authService.myDateToString(this.authService.jwtHelper.getTokenExpirationDate(this.authService.userToken)))
          localStorage.setItem("IsTokenExpired", this.authService.myBoolToString(this.authService.jwtHelper.isTokenExpired(this.authService.userToken)))
        }
          , xError => {
            this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error.modelStateAddedErrors[0].errorMessage; // YetkisizlikMetkisizlik
            console.log("ooops:", this.subscribeERR)
            this.alertifyService.error(this.subscribeERR);
          }
        )
      }
        , xError => {
          this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error.modelStateAddedErrors[0].errorMessage; // YetkisizlikMetkisizlik
          console.log("ooops:", this.subscribeERR)
          this.alertifyService.error(this.subscribeERR);
        }
      );

    this.LoggedUserName = localStorage.getItem(_LUK)

    this.router.navigate(['/welcome'])

  }

  logOut() { this.authService.logOut() }

  appRefresh(): void { //document.location.href = 'http://localhost:4200' 
  }
}
