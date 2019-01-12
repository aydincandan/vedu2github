import { Component, OnInit } from '@angular/core';
import { __Takvim } from '../_data/modeller/hepsi.model';
import { TakvimService } from "../_data/servisler/takvim.service";
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_data/servisler/alertify.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-takvim',
  templateUrl: './takvim.component.html',
  styleUrls: ['./takvim.component.css'],
  providers: [TakvimService]
})
export class TakvimComponent implements OnInit {
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }
  private gridApi;
  private gridColumnApi;
  private overlayLoadingTemplate;
  public columnDefs: any;
  rowDatas1 = [];
  public rowSelection: any;

  constructor(private takvimService: TakvimService, private activatedRoute: ActivatedRoute, private alertifyService: AlertifyService) {
    this.columnDefs = [
      { headerName: 'ID', field: 'idE' },
      { headerName: "kursAciklama", field: "kursAciklama" },
      { headerName: "kursZamani", field: "kursZamani" },
      { headerName: "dersDetaylarIdE", field: "dersDetaylarIdE" },
    ];

    this.rowSelection = "multiple";
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }

  ngOnInit() {
    this.fillAgGrid1()

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      // console.log("param : " + xx)
      // if (xx)
      //   this.getTakvim(xx);
      // else
      //   this.getTakvimler();
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  fillAgGrid1() {
    this.takvimService.getTakvimler().subscribe(data => { this.rowDatas1 = data; setTimeout(() => {this.gridApi.hideOverlay();}, 600); }
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

  ide: number
  onRowClicked(event: any) {
    console.log('event.data.IdE', event.data.idE);
    let ide = event.data.idE;
    this.alertifyService.error("on row clicked");
    return ide;
  }

  myDynFormGroup: FormGroup;
  aPersonUpdate: any = {}

  takvimNewData: any = {}
  takvimEkle() {

    this.myDynFormGroup=new FormGroup({
      title: new FormControl("takvim afafadsf"),
      zaman: new FormControl("123")
    });

    if (this.myDynFormGroup.valid) {

      let TAKVIM: any = Object.assign({}, this.myDynFormGroup.value);

      console.log("sendUpdateValues:", TAKVIM)

      this.takvimService.addTakvim(TAKVIM)
    }
  }

  onGridReady(event: any) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.gridApi.showLoadingOverlay();
    // this.alertifyService.error("onGridReady");
    this.gridApi.sizeColumnsToFit();
  }

  removeSelected() {
    var selectedData = this.gridApi.getSelectedRows();

    var silindiaydiler=""; var silindisayisi=0;
    for (var i in selectedData) {
      console.log(i + ' = ' + selectedData[i].idE);
      this.delTakvim(selectedData[i].idE);
      silindiaydiler+=selectedData[i].idE+", ";
      silindisayisi++;
    }

    this.alertifyService.success(silindisayisi + " adet kayıt silindi. Silinenler => " + silindiaydiler);

    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log("res", res);
  }
  
  delTakvim(aydi: number) {
    this.takvimService.delTakvim(aydi).subscribe(data => {
      // this.alertifyService.success(aydi + " silindi.");
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

}
