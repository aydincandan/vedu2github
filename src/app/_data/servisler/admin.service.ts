import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { __Kisi, adminUpdateDto } from '../modeller/hepsi.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private httpClient: HttpClient, private router: Router) { }

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

  getAdminler(): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Adminler";
    console.log("istek : " + istek)
    return this.httpClient.get<__Kisi[]>(istek)
  }

  getAdmin(Id: number): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Adminler/" + Id;
    console.log("istek : " + istek)
    return this.httpClient.get<__Kisi[]>(istek)
  }

  putAdmin(admkisi: adminUpdateDto): Observable<adminUpdateDto> {
    let istek: string = environment.api_url + "/Adminler/update/" + admkisi.IdE;
    console.log("istek : " + istek)
    return this.httpClient.put<adminUpdateDto>(istek, admkisi)
  }
}