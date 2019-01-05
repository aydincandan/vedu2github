// **
import { Component, OnInit } from '@angular/core';

import { __Kisi, adminUpdateDto, ogrenciUpdateDto, ogretmenUpdateDto } 
from '../_data/modeller/hepsi.model';

import { AuthService } from "../_data/servisler/auth.service";
import { AdminService } from "../_data/servisler/admin.service";
import { OgrenciService } from "../_data/servisler/ogrenci.service";
import { OgretmenService } from "../_data/servisler/ogretmen.service";

import { AlertifyService } from '../_data/servisler/alertify.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';

// import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AuthService, AdminService, OgrenciService, OgretmenService, AlertifyService] // gerek var mı?
})
export class AdminComponent implements OnInit {

  subscribeERR: any = {}

  get RoleNAME() { return localStorage.getItem("RoleNAME") }

  private dynrol: string;
  private gridApi;
  private rowData: any[];

  private columnDefs;
  private rowSelection;
  private gridColumnApi;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private alertifyService: AlertifyService
    , private authService: AuthService
    , private adminService: AdminService
    , private ogrenciService: OgrenciService
    , private ogretmenService: OgretmenService
  ) {

    this.columnDefs = [
      { headerName: 'TYPE', field: 'kisitipi' },
      { headerName: 'ID', field: 'idE' },
      { headerName: 'USERNAME', field: 'userName', editable: true },
      { headerName: 'EMAIL', field: 'email' },
      { headerName: 'ADI', field: 'adi' },
      { headerName: 'SOYADI', field: 'soyadi' },
      // { headerName: 'TCKIMLIK', field: 'tckimlik'},
      { headerName: 'TEL', field: 'telefon1', editable: true },
      // { headerName: 'ADR', field: 'adres1', editable: true },
      { headerName: 'isAnylogin', field: 'isAnylogin' },
      { headerName: 'lastloginDate', field: 'lastloginDate' },
    ];

    this.rowSelection = "multiple";

  }



  ngOnInit() {
    this.fillAgGrid1()

    this.createAdminForm();
    // this.createOgrenciForm();
    // this.createOgretmenForm();

    this.getAdmin(this.updateKisiID);
    // this.getOgrenci(this.updateKisiID);
    // this.getOgretmen(this.updateKisiID);

    console.log("this.updateKisiID:", this.updateKisiID)

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      console.log("param : " + xx)
      if (xx)
        this.getAdmin(xx);
      else
        this.getKisiler();
    }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  updateKisiID = parseInt(localStorage.getItem("IdE"));
  //rowData: __Kisi[];
  adminForm: FormGroup;

  adminUpdate: any = {}
  ogrenciUpdate: any = {}
  ogretmenUpdate: any = {}
  
  rowDatas1: __Kisi[];

  fillAgGrid1() {
    this.authService.getKisiler().subscribe(data => { this.rowDatas1 = data }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  setAdminForm() {
    this.adminForm = this.formBuilder.group(
      {
        Username: [this.rowData[0].UserName, Validators.required],
        Adi: [this.rowData[0].adi, Validators.required],
        Soyadi: [this.rowData[0].soyadi, Validators.required],
        TCkimlik: [this.rowData[0].tckimlik, [Validators.minLength(11), Validators.maxLength(11)]],
        telefon1: [this.rowData[0].telefon1, [Validators.minLength(10), Validators.maxLength(10)]],
        YetkiSeviye: [this.rowData[0].YetkiSeviye,],
      }
    )
  }
  setOgrenciForm() {
    this.adminForm = this.formBuilder.group(
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
  setOgretmenForm() {
    this.adminForm = this.formBuilder.group(
      {
        Username: [this.rowData[0].UserName, Validators.required],
        Adi: [this.rowData[0].adi, Validators.required],
        Soyadi: [this.rowData[0].soyadi, Validators.required],
        TCkimlik: [this.rowData[0].tckimlik, [Validators.minLength(11), Validators.maxLength(11)]],
        telefon1: [this.rowData[0].telefon1, [Validators.minLength(10), Validators.maxLength(10)]],
        UzmanlikAlanlari: [this.rowData[0].UzmanlikAlanlari,],
      }
    )
  }

  createAdminForm() {
    this.adminForm = this.formBuilder.group(
      {
        Username: ["", Validators.required],
        Adi: ["", Validators.required],
        Soyadi: ["", Validators.required],
        TCkimlik: ["", [Validators.minLength(11), Validators.maxLength(11)]],
        telefon1: ["", Validators.required],
        YetkiSeviye: ["",],
      }
    )
  }
  createOgrenciForm() {
    this.adminForm = this.formBuilder.group(
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
  createOgretmenForm() {
    this.adminForm = this.formBuilder.group(
      {
        Username: ["", Validators.required],
        Adi: ["", Validators.required],
        Soyadi: ["", Validators.required],
        TCkimlik: ["", [Validators.minLength(11), Validators.maxLength(11)]],
        telefon1: ["", Validators.required],
        UzmanlikAlanlari: ["",],
      }
    )
  }

  editAdmin() {
    if (this.adminForm.valid) {
      this.adminUpdate = Object.assign({}, this.adminForm.value)
      console.log(this.adminUpdate)
      let ogrkisi: adminUpdateDto = new adminUpdateDto;
      ogrkisi.IdE = this.updateKisiID;
      ogrkisi.YetkiSeviye = this.adminForm.value.YetkiSeviye;
      ogrkisi.Username = this.adminForm.value.Username;
      ogrkisi.Adi = this.adminForm.value.Adi;
      ogrkisi.Soyadi = this.adminForm.value.Soyadi;
      ogrkisi.TCkimlik = this.adminForm.value.TCkimlik;
      ogrkisi.telefon1 = this.adminForm.value.telefon1;
      this.adminService.putAdmin(ogrkisi).subscribe(fff => { console.log(fff) }
        , Error => {
          this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
          console.log("ooops:", this.subscribeERR)
          this.alertifyService.error(this.subscribeERR);
        }
      )
    }
  }
  editOgrenci() {
    if (this.adminForm.valid) {
      this.ogrenciUpdate = Object.assign({}, this.adminForm.value)
      console.log(this.ogrenciUpdate)
      let ogrkisi: ogrenciUpdateDto = new ogrenciUpdateDto;
      ogrkisi.IdE = this.updateKisiID;
      ogrkisi.IlgiAlanlari = this.adminForm.value.IlgiAlanlari;
      ogrkisi.Username = this.adminForm.value.Username;
      ogrkisi.Adi = this.adminForm.value.Adi;
      ogrkisi.Soyadi = this.adminForm.value.Soyadi;
      ogrkisi.TCkimlik = this.adminForm.value.TCkimlik;
      ogrkisi.telefon1 = this.adminForm.value.telefon1;
      this.ogrenciService.putOgrenci(ogrkisi).subscribe(fff => { console.log(fff) }
        , Error => {
          this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
          console.log("ooops:", this.subscribeERR)
          this.alertifyService.error(this.subscribeERR);
        }
      )
    }
  }
  editOgretmen() {
    if (this.adminForm.valid) {
      this.ogretmenUpdate = Object.assign({}, this.adminForm.value)
      console.log(this.ogretmenUpdate)
      let ogrkisi: ogretmenUpdateDto = new ogretmenUpdateDto;
      ogrkisi.IdE = this.updateKisiID;
      ogrkisi.UzmanlikAlanlari = this.adminForm.value.UzmanlikAlanlari;
      ogrkisi.Username = this.adminForm.value.Username;
      ogrkisi.Adi = this.adminForm.value.Adi;
      ogrkisi.Soyadi = this.adminForm.value.Soyadi;
      ogrkisi.TCkimlik = this.adminForm.value.TCkimlik;
      ogrkisi.telefon1 = this.adminForm.value.telefon1;
      this.ogretmenService.putOgretmen(ogrkisi).subscribe(fff => { console.log(fff) }
        , Error => {
          this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
          console.log("ooops:", this.subscribeERR)
          this.alertifyService.error(this.subscribeERR);
        }
      )
    }
  }

  getAdmin(xx: number) {
    this.adminService.getAdmin(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setAdminForm()
      // fakat başka doğru çözümü olabilir gibi... https://yazilimgunlugu.org/angular-4-form-kullanimi-dogrulama-validations/
    }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }
  getOgrenci(xx: number) {
    this.ogrenciService.getOgrenci(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setOgrenciForm()
      // fakat başka doğru çözümü olabilir gibi... https://yazilimgunlugu.org/angular-4-form-kullanimi-dogrulama-validations/
    }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }
  getOgretmen(xx: number) {
    this.ogretmenService.getOgretmen(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setOgretmenForm()
      // fakat başka doğru çözümü olabilir gibi... https://yazilimgunlugu.org/angular-4-form-kullanimi-dogrulama-validations/
    }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  getKisiler() {
    this.adminService.getAdminler().subscribe(data => { this.rowData = data }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }
  delKisi(aydi: number) {
    this.authService.delKisi(aydi).subscribe(data => {
      this.rowData = data;
      this.alertifyService.success(aydi + " silindi.");
    }
      , Error => {
        this.subscribeERR = Error.statusText + "(" + Error.status + ") " + Error.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  ide: number
  onRowClicked(event: any) {
    console.log('event.data.IdE', event.data.idE); let ide = event.data.idE;

    this.dynrol = event.data.kisitipi

    if (this.dynrol == "ADM")
      this.getAdmin(ide)
    else if (this.dynrol == "STU")
      this.getOgrenci(ide)
    else if (this.dynrol == "TEA")
      this.getOgretmen(ide)

    return ide;
  }

  onGridReady(event: any) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
  }

  removeSelected() {
    var selectedData = this.gridApi.getSelectedRows();

    for (var i in selectedData) {
      console.log(i + ' = ' + selectedData[i].idE);
      this.delKisi(selectedData[i].idE);
    }

    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log("res", res);
  }
}
