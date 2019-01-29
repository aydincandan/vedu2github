import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { __Ders } from '../modeller/hepsi.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})

export class DersService {
  subscribeERR: any = {}

  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService, private router: Router) { }

  setDers(Id: number, data: any): Observable<__Ders[]> {
    let istek: string = environment.api_url + "/dersler/update/" + Id; console.log("istek : " + istek)
    return this.httpClient.put<__Ders[]>(istek, data)
  }

  delDers(Id: number): Observable<__Ders[]> {
    let istek: string = environment.api_url + "/dersler/delete/" + Id; console.log("istek : " + istek)
    return this.httpClient.delete<__Ders[]>(istek)
  }
  
  delDersAll(): Observable<__Ders[]> {
    let istek: string = environment.api_url + "/dersler/deleteall"; console.log("istek : " + istek)
    return this.httpClient.delete<__Ders[]>(istek)
  }

  getDersler(): Observable<__Ders[]> {
    let istek: string = environment.api_url + "/dersler"; console.log("istek : " + istek)
    return this.httpClient.get<__Ders[]>(istek)
  }

  getDers(xx: number): Observable<__Ders[]> {
    let istek: string = environment.api_url + "/dersler/" + xx; console.log("istek : " + istek)
    return this.httpClient.get<__Ders[]>(istek)
  }

  // __Ders yerine any de olabiliyor.

  addDers(data: any): Observable<__Ders> {
    let istek: string = environment.api_url + '/dersler/add'; console.log("istek : " + istek)
    return this.httpClient.post<__Ders>(istek, data)
  }

}