import { Component, OnInit } from '@angular/core';
import { __Ders } from '../_data/modeller/hepsi.model';
import { DersService } from "../_data/servisler/ders.service";
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_data/servisler/alertify.service';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css'],
  providers: [DersService]
})
export class DersComponent implements OnInit {
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }

  public columnDefs: any;

  constructor(private dersService: DersService, private activatedRoute: ActivatedRoute, private alertifyService: AlertifyService) {
    this.columnDefs = [
      { headerName: 'ID', field: 'idE' },
      { headerName: 'TITLE', field: 'title' },
      { headerName: 'dersDetaylar', field: 'dersDetaylar' },
      { headerName: 'kisininDersleri', field: 'kisininDersleri' },
    ];
  }

  rowDatas1 = [];
  fillAgGrid1() {
    this.dersService.getDersler().subscribe(data => { this.rowDatas1 = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  ngOnInit() {
    this.fillAgGrid1()

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      console.log("param : " + xx)
      if (xx)
        this.getDers(xx);
      else
        this.getDersler();
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  dersler: __Ders[]

  getDers(xx: number) {
    this.dersService.getDers(xx).subscribe(data => { this.dersler = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }
  getDersler() {
    this.dersService.getDersler().subscribe(data => { this.dersler = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  ide: number
  onRowClicked(event: any) {
    console.log('event.data.IdE', event.data.idE);
    let ide = event.data.idE;
    this.alertifyService.error("on row clicked");
    return ide;
  }

  dersEkle() {
    this.alertifyService.error("ders eklendi");

  }
}
