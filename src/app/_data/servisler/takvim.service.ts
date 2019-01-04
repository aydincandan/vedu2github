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

  addTakvim(data: __Takvim) {
    let istek: string = environment.api_url + '/takvimler/add'
    this.httpClient.post(istek, data).subscribe(data => {
      this.alertifyService.success("Takvim (ID : " + data["ID"] + ") başarıyla eklendi.")
      console.log("istek : " + istek)
      this.router.navigateByUrl('/takvimDetay/' + data["ID"])
    }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error.modelStateAddedErrors[0].errorMessage; // YetkisizlikMetkisizlik
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    );
  }
}