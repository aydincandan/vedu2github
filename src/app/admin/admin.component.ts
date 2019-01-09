// ***
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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  // olmasa oluyor mu? providers: [AuthService, AdminService, OgrenciService, OgretmenService, AlertifyService] // gerek var mı?
})
export class AdminComponent implements OnInit {

  dynrol: string

  subscribeERR: any = {}

  get RoleNAME() { return localStorage.getItem("RoleNAME") }

  private gridApi;
  private rowData: any[];

  public columnDefs: any;
  public rowSelection: any;
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

    console.log("this.updateKisiID:", this.updateKisiID)
    console.log("this.dynrol:", this.dynrol)

    this.createBaseForm()

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      console.log("param : " + xx)
      if (xx)
        this.getAdminToSetForm(xx);
      else
        this.getKisiler();
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  updateKisiID = parseInt(localStorage.getItem("IdE"));
  //rowData: __Kisi[];
  
  myDynFormGroup: FormGroup;
  aPersonUpdate: any = {}

  rowDatas1: __Kisi[];

  fillAgGrid1() {
    this.authService.getKisiler().subscribe(data => { this.rowDatas1 = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  setAdminForm() {
    this.myDynFormGroup = this.formBuilder.group(
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
  setOgretmenForm() {
    this.myDynFormGroup = this.formBuilder.group(
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

  CTRL_Username = new FormControl('1', Validators.required)
  CTRL_Adi = new FormControl('2', Validators.required)
  CTRL_Soyadi = new FormControl('3', Validators.required)
  CTRL_TCkimlik = new FormControl('4', [Validators.minLength(11), Validators.maxLength(11)])
  CTRL_telefon1 = new FormControl('5', [Validators.minLength(10), Validators.maxLength(10)])
  createBaseForm() {
    this.myDynFormGroup = this.formBuilder.group(
      {
        Username: this.CTRL_Username,
        Adi: this.CTRL_Adi,
        Soyadi: this.CTRL_Soyadi,
        TCkimlik: this.CTRL_TCkimlik,
        telefon1: this.CTRL_telefon1
      }
    )
  }

  handleKisi() {
    if (this.myDynFormGroup.valid) {

      if (this.dynrol == "ADM")
        this.editAdmin()
      else if (this.dynrol == "STU")
        this.editOgrenci()
      else if (this.dynrol == "TEA")
        this.editOgretmen()

    }
  }
  editAdmin() {
    if (this.myDynFormGroup.valid) {
      this.aPersonUpdate = Object.assign({}, this.myDynFormGroup.value)
      let kisi: adminUpdateDto = this.aPersonUpdate;
      kisi.IdE = this.updateKisiID;
      // kisi.Username = this.myDynFormGroup.value.Username;
      // kisi.Adi = this.myDynFormGroup.value.Adi;
      // kisi.Soyadi = this.myDynFormGroup.value.Soyadi;
      // kisi.TCkimlik = this.myDynFormGroup.value.TCkimlik;
      // kisi.telefon1 = this.myDynFormGroup.value.telefon1;
      kisi.YetkiSeviye = this.myDynFormGroup.value.YetkiSeviye;
      console.log("sendUpdateValues:", kisi)

      this.adminService.putAdmin(kisi).subscribe(
        OkReturn => { console.log("OkReturn:", OkReturn); this.alertifyService.success("GÜNCELLENDİ :-)"); }
        , xError => {
          this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
          console.log("ooops:", this.subscribeERR)
          this.alertifyService.error(this.subscribeERR);
        }
      )
    }
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

      this.ogrenciService.putOgrenci(kisi).subscribe(
        OkReturn => { console.log("OkReturn:", OkReturn); this.alertifyService.success("GÜNCELLENDİ :-)"); }
        , xError => {
          this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
          console.log("ooops:", this.subscribeERR)
          this.alertifyService.error(this.subscribeERR);
        }
      )
    }
  }
  editOgretmen() {
    if (this.myDynFormGroup.valid) {
      this.aPersonUpdate = Object.assign({}, this.myDynFormGroup.value)
      let kisi: ogretmenUpdateDto = this.aPersonUpdate;
      kisi.IdE = this.updateKisiID;
      // kisi.Username = this.myDynFormGroup.value.Username;
      // kisi.Adi = this.myDynFormGroup.value.Adi;
      // kisi.Soyadi = this.myDynFormGroup.value.Soyadi;
      // kisi.TCkimlik = this.myDynFormGroup.value.TCkimlik;
      // kisi.telefon1 = this.myDynFormGroup.value.telefon1;
      kisi.UzmanlikAlanlari = this.myDynFormGroup.value.UzmanlikAlanlari;
      console.log("sendUpdateValues:", kisi)

      this.ogretmenService.putOgretmen(kisi).subscribe(
        OkReturn => { console.log("OkReturn:", OkReturn); this.alertifyService.success("GÜNCELLENDİ :-)"); }
        , xError => {
          this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
          console.log("ooops:", this.subscribeERR)
          this.alertifyService.error(this.subscribeERR);
        }
      )
    }
  }

  getAdminToSetForm(xx: number) {
    this.adminService.getAdmin(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setAdminForm()
      // fakat başka doğru çözümü olabilir gibi... https://yazilimgunlugu.org/angular-4-form-kullanimi-dogrulama-validations/
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }
  getOgrenciToSetForm(xx: number) {
    this.ogrenciService.getOgrenci(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setOgrenciForm()
      // fakat başka doğru çözümü olabilir gibi... https://yazilimgunlugu.org/angular-4-form-kullanimi-dogrulama-validations/
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }
  getOgretmenToSetForm(xx: number) {
    this.ogretmenService.getOgretmen(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setOgretmenForm()
      // fakat başka doğru çözümü olabilir gibi... https://yazilimgunlugu.org/angular-4-form-kullanimi-dogrulama-validations/
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  getKisiler() {
    this.adminService.getAdminler().subscribe(data => { this.rowData = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
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
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  formTitle: string = 'Sabit Bilgileri'
  buttonText: string = 'Tamam'
  roleOzelAlan: FormControl
  
  ide: number
  onRowClicked(event: any) {
    console.log('event.data.IdE', event.data.idE);

    let ide = event.data.idE;

    this.dynrol = event.data.kisitipi
    this.updateKisiID = ide

    if (this.dynrol == 'ADM' || !this.dynrol) {
      this.buttonText = 'Tamam';
      this.formTitle = 'Yönetici Sabit Bilgileri';

      this.roleOzelAlan = new FormControl('yönetici yetki seviyesi')

      /** Gruba ekle*/
      this.myDynFormGroup.addControl("YetkiSeviye", this.roleOzelAlan)
      this.getAdminToSetForm(ide)
    }
    else if (this.dynrol == 'STU') {
      this.buttonText = 'Tamam';
      this.formTitle = 'Öğrenci Sabit Bilgileri';

      this.roleOzelAlan = new FormControl('öğrenci ilgi alanları')

      /** Gruba ekle*/
      this.myDynFormGroup.addControl("IlgiAlanlari", this.roleOzelAlan)
      this.getOgrenciToSetForm(ide)
    }
    else if (this.dynrol == 'TEA') {
      this.buttonText = 'Tamam';
      this.formTitle = 'Öğretmen Sabit Bilgileri';

      this.roleOzelAlan = new FormControl('öğretmen uzmanlık alanları')

      /** Gruba ekle*/
      this.myDynFormGroup.addControl("UzmanlikAlanlari", this.roleOzelAlan)
      this.getOgretmenToSetForm(ide)
    }

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
