import { Injectable } from '@angular/core';
import { UserForRegisterDto, UserForLoginDto, __Kisi } from '../modeller/hepsi.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tokenNotExpired, JwtHelper } from "angular2-jwt";
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'

export const _LUK: string = "UN";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscribeERR: any = {}

  constructor(private httpClient: HttpClient, private router: Router, private alertifyService: AlertifyService, private datepipe: DatePipe) { }

  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token"

  ngOnInit() {
    console.log("hi I'm auth.service at ngOnInit");
    this.alertifyService.error("hi I'm auth.service at ngOnInit")
  }

  getLoggedKisi(): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/auth/Kisiler/" + this.getCurrentUserId()
    console.log("[" + istek + "]")
    return this.httpClient.get<__Kisi[]>(istek)
  }

  KisilerList(): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/auth/KisilerList"
    console.log("[" + istek + "]")
    return this.httpClient.get<__Kisi[]>(istek)
  }

  delKisi(Id: number): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Auth/Kisiler/delete/" + Id;
    console.log("istek : " + istek)
    return this.httpClient.delete<__Kisi[]>(istek)
  }

  getKisi(Id: number): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Auth/Kisiler/" + Id;
    console.log("istek : " + istek)
    return this.httpClient.get<__Kisi[]>(istek)
  }

  getKisiler(): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Auth/Kisiler";
    console.log("istek : " + istek)
    return this.httpClient.get<__Kisi[]>(istek)
  }

  KisiRegister(registerUser: UserForRegisterDto): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.append("Content-Type", "application/json")
    return this.httpClient
      .post<any>(environment.api_url + "/auth/KisiRegister", registerUser, { headers: headers })
  }

  KisiLogin(loginUser: UserForLoginDto): Observable<__Kisi[]>  {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.httpClient
      .post<__Kisi[]>(environment.api_url + "/auth/KisiLogin", loginUser, { headers: headers })
  }
  
  saveToken(tokendata) { localStorage.setItem(this.TOKEN_KEY, tokendata) }
  get savedToken() { return localStorage.getItem(this.TOKEN_KEY) }

  logOut() {
    localStorage.removeItem("TokenExpireDate");
    localStorage.removeItem("kisitipi");
    localStorage.removeItem("IdE2");
    localStorage.removeItem("IdE");
    localStorage.removeItem("RoleNAME");
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error("auth.service.Sistemden çıkış(" + localStorage.getItem(_LUK) + ") yapıldı")
    localStorage.removeItem(_LUK);
    localStorage.removeItem("jwtToken");
    localStorage.clear();
    this.router.navigate(['/welcome'])
  }

  TicketNotEXPIRED() { return tokenNotExpired(this.TOKEN_KEY) }

  getCurrentUserId(): number {
    if (this.savedToken) {
      localStorage.setItem("IdE", this.jwtHelper.decodeToken(this.savedToken).nameid)
      return parseInt(localStorage.getItem("IdE"))
    }
    else
      return -3538
  }

  myDateToString(zaman: Date): string { return this.datepipe.transform(zaman, 'dd.MM.yyyy HH:mm:ss') }

  myBoolToString(deger: Boolean): string {
    if (deger)
      return "true";
    else
      return "false"
  }
}
