import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { __Kisi, ogretmenUpdateDto } from '../modeller/hepsi.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OgretmenService {

  constructor(private httpClient: HttpClient) { }

  getOgretmenler(): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Ogretmenler";
    console.log("istek : " + istek)
    return this.httpClient.get<__Kisi[]>(istek)
  }

  getOgretmen(Id: number): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Ogretmenler/" + Id;
    console.log("istek : " + istek)
    return this.httpClient.get<__Kisi[]>(istek)
  }

  putOgretmen(ogrtkisi: ogretmenUpdateDto): Observable<ogretmenUpdateDto> {
    let istek: string = environment.api_url + "/Ogretmenler/update/" + ogrtkisi.IdE;
    console.log("istek : " + istek)
    return this.httpClient.put<ogretmenUpdateDto>(istek, ogrtkisi)
  }
}