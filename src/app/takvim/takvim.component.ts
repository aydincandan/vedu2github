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
  private columnDefs;
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
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
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
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
      }
    )
  }

  takvimler: __Takvim[]
  getTakvim(xx: number) {
    this.takvimService.getTakvim(xx).subscribe(data => { this.takvimler = data }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
      }
    )
  }
  getTakvimler() {
    this.takvimService.getTakvimler().subscribe(data => { this.takvimler = data }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
      }
    )
  }

  ide: number
  onRowClicked(event: any) { console.log('event.data.IdE', event.data.idE); let ide = event.data.idE; return ide; }

}
