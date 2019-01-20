import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { __Kisi, ogrenciUpdateDto } from '../modeller/hepsi.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OgrenciService {

  constructor(private httpClient: HttpClient) { }

  getOgrenciler(): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Ogrenciler";
    console.log("istek : " + istek)
    return this.httpClient.get<__Kisi[]>(istek)
  }

  getOgrenci(Id: number): Observable<__Kisi[]> {
    let istek: string = environment.api_url + "/Ogrenciler/" + Id;
    console.log("istek : " + istek)
    return this.httpClient.get<__Kisi[]>(istek)
  }

  putOgrenci(ogrtkisi: ogrenciUpdateDto): Observable<ogrenciUpdateDto> {
    let istek: string = environment.api_url + "/Ogrenciler/update/" + ogrtkisi.IdE;
    console.log("istek : " + istek)
    return this.httpClient.put<ogrenciUpdateDto>(istek, ogrtkisi)
  }
}