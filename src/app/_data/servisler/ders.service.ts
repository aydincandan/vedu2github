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

  getDersler(): Observable<__Ders[]> {
    let istek: string = environment.api_url + "/dersler";
    console.log("istek : " + istek)
    return this.httpClient.get<__Ders[]>(istek)
  }

  getDers(xx: number): Observable<__Ders[]> {
    let istek: string = environment.api_url + "/dersler/" + xx;
    console.log("istek : " + istek)
    return this.httpClient.get<__Ders[]>(istek)
  }
  addDers2(data: any): any {
    let istek: string = environment.api_url + '/dersler/add'
    console.log("istek2 : " + istek)
    return this.httpClient.post<any>(istek, data)
  }
  addDers(data: any):Observable<__Ders> {
    let donus:__Ders
    let istek: string = environment.api_url + '/dersler/add'
    console.log("-istek : " + istek)

    // return this.httpClient.post<__Ders>(istek, data);

    this.httpClient.post<__Ders>(istek, data).subscribe(data => {
      this.alertifyService.success("Ders (ID : " + data.idE + ") başarıyla eklendi.")
      console.log("-data : " + data.idE)
      // this.router.navigateByUrl('/dersDetay/' + data.idE)
      donus = data; 
      return donus;
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
        return this.subscribeERR;
      }
      , () => {
        console.log("The POST observable is now completed.");
        return donus;
      }
    );

    return; // dönüş maalesef buradan -1 olarak oluyor
  }

  delDers(Id: number): Observable<__Ders[]> {
    let istek: string = environment.api_url + "/dersler/delete/" + Id;
    console.log("istek : " + istek)
    return this.httpClient.delete<__Ders[]>(istek)
  }

}