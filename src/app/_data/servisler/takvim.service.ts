import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { __Takvim } from '../modeller/hepsi.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})

export class TakvimService {
  subscribeERR: any = {}

  constructor(private httpClient: HttpClient, private router: Router, private alertifyService: AlertifyService) { }

  getTakvimler(): Observable<__Takvim[]> {
    let istek: string = environment.api_url + "/takvimler";
    console.log("istek : " + istek)
    return this.httpClient.get<__Takvim[]>(istek)
  }

  getTakvim(xx: number): Observable<__Takvim[]> {
    let istek: string = environment.api_url + "/takvimler/" + xx;
    console.log("istek : " + istek)
    return this.httpClient.get<__Takvim[]>(istek)
  }

  addTakvim(data: __Takvim): Observable<__Takvim> {
    let istek: string = environment.api_url + '/takvimler/add'
    console.log("istek : " + istek)
    return this.httpClient.post<__Takvim>(istek, data)
  }

  delTakvim(Id: number): Observable<__Takvim[]> {
    let istek: string = environment.api_url + "/takvimler/delete/" + Id;
    console.log("istek : " + istek)
    return this.httpClient.delete<__Takvim[]>(istek)
  }

}