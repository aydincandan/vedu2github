import { Component, OnInit } from '@angular/core';
import { __Kisi, adminUpdateDto } from '../_data/modeller/hepsi.model';
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
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  // providers: [AdminService, AlertifyService] // gerek var mı?
})
export class AdminComponent implements OnInit {
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }

  private gridApi;
  private rowData: any[];

  private columnDefs;
  private rowSelection;
  private gridColumnApi;

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private alertifyService: AlertifyService
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

    this.getAdmin(this.updateKisiID);

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
  rowDatas1: __Kisi[];

  fillAgGrid1() {
    this.adminService.getKisiler().subscribe(data => { this.rowDatas1 = data }
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

  getAdmin(xx: number) {
    this.adminService.getAdmin(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setAdminForm() // böyle de oluyor 
      // fakat başka doğru çözümü olabilir gibi... https://www.concretepage.com/angular-2/angular-2-4-formbuilder-example
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
      this.setAdminForm() // böyle de oluyor 
      // fakat başka doğru çözümü olabilir gibi... https://www.concretepage.com/angular-2/angular-2-4-formbuilder-example
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
      this.setAdminForm() // böyle de oluyor 
      // fakat başka doğru çözümü olabilir gibi... https://www.concretepage.com/angular-2/angular-2-4-formbuilder-example
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
    this.adminService.delKisi(aydi).subscribe(data => {
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

    if (event.data.kisitipi == "ADM")
      this.getAdmin(ide)
    else if (event.data.kisitipi == "STU")
      this.getOgrenci(ide)
    else if (event.data.kisitipi == "TEA")
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
