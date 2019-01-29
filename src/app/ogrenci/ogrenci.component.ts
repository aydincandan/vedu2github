import { Component, OnInit } from '@angular/core';
import { __Kisi, ogrenciUpdateDto } from '../_data/modeller/hepsi.model';
import { OgrenciService } from "../_data/servisler/ogrenci.service";
import { AuthService } from "../_data/servisler/auth.service";
import { AlertifyService } from '../_data/servisler/alertify.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css'],
  // providers: [OgrenciService]
})



export class OgrenciComponent implements OnInit {
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }
  get isAuthenticated() { return this.authService.TicketNotEXPIRED() }
  private gridApi;
  private gridColumnApi;
  private overlayLoadingTemplate;
  public columnDefs: any;
  private rowDatas1 = [];
  public rowSelection: any;
  private rowData: any[];

  constructor(private ogrenciService: OgrenciService, private authService: AuthService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private alertifyService: AlertifyService) {
    this.columnDefs = [
      { headerName: 'TYPE', field: 'kisitipi' },
      { headerName: 'ID', field: 'idE' },
      { headerName: 'USERNAME', field: 'userName', editable: true },
      { headerName: 'EMAIL', field: 'email' },
      { headerName: 'ADI', field: 'adi' },
      { headerName: 'SOYADI', field: 'soyadi' },
      // { headerName: 'TCKIMLIK', field: 'tckimlik'},
      // { headerName: 'ILG', field: 'ilgiAlanlari', editable: true },
      { headerName: 'TEL', field: 'telefon1', editable: true },
      // { headerName: 'ADR', field: 'adres1', editable: true },
    ];

    this.rowSelection = "multiple";
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }

  ngOnInit() {
    this.fillAgGrid1()
    this.createmyDynFormGroup();
    this.getOgrenci(this.updateKisiID);
    console.log("this.rowData : ", this.rowData)

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      // console.log("param : " + xx)
      // if (xx)
      //   this.getOgrenci(xx);
      // else
      //   this.getOgrenciler();
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  fillAgGrid1() {
    this.ogrenciService.getOgrenciler().subscribe(data => { console.log("data => " + JSON.stringify(data)); this.rowDatas1 = data; setTimeout(() => {this.gridApi.hideOverlay();}, 600); }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  updateKisiID = parseInt(localStorage.getItem("IdE"));
    
  myDynFormGroup: FormGroup;
  aPersonUpdate: any = {}

  setmyDynFormGroup() {
    this.myDynFormGroup = this.formBuilder.group(
      {
        Username: [this.rowData[0].UserName, Validators.required],
        Adi: [this.rowData[0].adi, Validators.required],
        Soyadi: [this.rowData[0].soyadi, Validators.required],
        TCkimlik: [this.rowData[0].tckimlik, [Validators.minLength(11), Validators.maxLength(11)]],
        telefon1: [this.rowData[0].telefon1, [Validators.minLength(10), Validators.maxLength(10)]],
        IlgiAlanlari: [this.rowData[0].IlgiAlanlari,],
      }
    )
  }

  createmyDynFormGroup() {
    this.myDynFormGroup = this.formBuilder.group(
      {
        Username: ["", Validators.required],
        Adi: ["", Validators.required],
        Soyadi: ["", Validators.required],
        TCkimlik: ["", [Validators.minLength(11), Validators.maxLength(11)]],
        telefon1: ["", Validators.required],
        IlgiAlanlari: ["",],
      }
    )
  }

  editOgrenci() {
    if (this.myDynFormGroup.valid) {
      this.aPersonUpdate = Object.assign({}, this.myDynFormGroup.value)
      let kisi: ogrenciUpdateDto = this.aPersonUpdate;
      kisi.IdE = this.updateKisiID;
      // kisi.Username = this.myDynFormGroup.value.Username;
      // kisi.Adi = this.myDynFormGroup.value.Adi;
      // kisi.Soyadi = this.myDynFormGroup.value.Soyadi;
      // kisi.TCkimlik = this.myDynFormGroup.value.TCkimlik;
      // kisi.telefon1 = this.myDynFormGroup.value.telefon1;
      kisi.IlgiAlanlari = this.myDynFormGroup.value.IlgiAlanlari;
      console.log("sendUpdateValues:", kisi)

      this.ogrenciService.putOgrenci(kisi).subscribe(OkReturn => { console.log("OkReturn:", OkReturn); this.alertifyService.success("GÜNCELLENDİ :-)"); }
        , xError => {
          this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
          console.log("ooops:", this.subscribeERR)
          this.alertifyService.error(this.subscribeERR);
        }
      )
    }
  }

  getOgrenci(xx: number) {
    this.ogrenciService.getOgrenci(xx).subscribe(data => { console.log("data => " + JSON.stringify(data));
      this.rowData = data;
      // console.log(this.rowData)
      this.setmyDynFormGroup()
    }
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

  onGridReady(event: any) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.gridApi.showLoadingOverlay();
    // this.alertifyService.error("onGridReady");
    this.gridApi.sizeColumnsToFit();
  }

}
