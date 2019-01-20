import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { __Kisi, adminUpdateDto } from '../modeller/hepsi.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private httpClient: HttpClient) { }

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