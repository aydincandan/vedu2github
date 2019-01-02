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

  addDers(data: __Ders) {
    let istek: string = environment.api_url + '/dersler/add'
    this.httpClient.post(istek, data).subscribe(data => {
      this.alertifyService.success("Ders (ID : " + data["ID"] + ") başarıyla eklendi.")
      console.log("istek : " + istek)
      this.router.navigateByUrl('/dersDetay/' + data["ID"])
    }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    );
  }
}