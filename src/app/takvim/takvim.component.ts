import { Component, OnInit } from '@angular/core';
import { __Takvim } from '../_data/modeller/hepsi.model';
import { TakvimService } from "../_data/servisler/takvim.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-takvim',
  templateUrl: './takvim.component.html',
  styleUrls: ['./takvim.component.css'],
  providers: [TakvimService]
})
export class TakvimComponent implements OnInit {
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }

  public columnDefs: any;

  constructor(private takvimService: TakvimService, private activatedRoute: ActivatedRoute) {
    this.columnDefs = [
      { headerName: 'ID', field: 'idE' },
      { headerName: "kursAciklama", field: "kursAciklama" },
      { headerName: "kursZamani", field: "kursZamani" },
      { headerName: "dersDetaylarIdE", field: "dersDetaylarIdE" },
    ];
  }


  rowDatas1 = [];
  fillAgGrid1() {
    this.takvimService.getTakvimler().subscribe(data => { this.rowDatas1 = data }
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
        this.getTakvim(xx);
      else
        this.getTakvimler();
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  takvimler: __Takvim[]
  getTakvim(xx: number) {
    this.takvimService.getTakvim(xx).subscribe(data => { this.takvimler = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }
  getTakvimler() {
    this.takvimService.getTakvimler().subscribe(data => { this.takvimler = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  ide: number
  onRowClicked(event: any) { console.log('event.data.IdE', event.data.idE); let ide = event.data.idE; return ide; }

}
