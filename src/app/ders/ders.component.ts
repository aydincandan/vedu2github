import { Component, OnInit } from '@angular/core';
import { __Ders } from '../_data/modeller/hepsi.model';
import { DersService } from "../_data/servisler/ders.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css'],
  providers: [DersService]
})
export class DersComponent implements OnInit {
  subscribeERR: any = {}
  private columnDefs;
  constructor(private dersService: DersService, private activatedRoute: ActivatedRoute) {
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
        this.getDers(xx);
      else
        this.getDersler();
    }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
      }
    )
  }

  dersler: __Ders[]

  getDers(xx: number) {
    this.dersService.getDers(xx).subscribe(data => { this.dersler = data }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
      }
    )
  }
  getDersler() {
    this.dersService.getDersler().subscribe(data => { this.dersler = data }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
      }
    )
  }

  ide: number
  onRowClicked(event: any) { console.log('event.data.IdE', event.data.idE); let ide = event.data.idE; return ide; }

}
