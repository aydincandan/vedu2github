import { Component, OnInit } from '@angular/core';
import { __Kisi, ogrenciUpdateDto } from '../_data/modeller/hepsi.model';
import { OgrenciService } from "../_data/servisler/ogrenci.service";
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

  private columnDefs;
  constructor(private ogrenciService: OgrenciService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private alertifyService:AlertifyService) {
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
   }

  ngOnInit() {
    this.createOgrenciForm();
    this.getOgrenci(this.updateKisiID);
    console.log(this.rowData)

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      console.log("param : " + xx)
      if (xx)
        this.getOgrenci(xx);
      else
        this.getOgrenciler();
    }
    , xError => {
      this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
      console.log("ooops:", this.subscribeERR)
      this.alertifyService.error(this.subscribeERR);
    }
)
  }

  updateKisiID = parseInt(localStorage.getItem("IdE"));
  rowData: __Kisi[];
  ogrenciForm: FormGroup;
  ogrenciUpdate: any = {}

  setOgrenciForm() {
    this.ogrenciForm = this.formBuilder.group(
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

  createOgrenciForm() {
    this.ogrenciForm = this.formBuilder.group(
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
    if (this.ogrenciForm.valid) {
      this.ogrenciUpdate = Object.assign({}, this.ogrenciForm.value)
      console.log(this.ogrenciUpdate)
      let ogrkisi: ogrenciUpdateDto = new ogrenciUpdateDto;
      ogrkisi.IdE = this.updateKisiID;
      ogrkisi.IlgiAlanlari = this.ogrenciForm.value.IlgiAlanlari;
      ogrkisi.Username = this.ogrenciForm.value.Username;
      ogrkisi.Adi = this.ogrenciForm.value.Adi;
      ogrkisi.Soyadi = this.ogrenciForm.value.Soyadi;
      ogrkisi.TCkimlik = this.ogrenciForm.value.TCkimlik;
      ogrkisi.telefon1 = this.ogrenciForm.value.telefon1;
      this.ogrenciService.putOgrenci(ogrkisi).subscribe(fff => { console.log(fff) }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
    }
  }

  getOgrenci(xx: number) {
    this.ogrenciService.getOgrenci(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setOgrenciForm()
    }
    , xError => {
      this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
      console.log("ooops:", this.subscribeERR)
      this.alertifyService.error(this.subscribeERR);
    }
)
  }

  getOgrenciler() { this.ogrenciService.getOgrenciler().subscribe(data => { this.rowData = data }
    , xError => {
      this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
      console.log("ooops:", this.subscribeERR)
      this.alertifyService.error(this.subscribeERR);
    }
) }

  ide: number
  onRowClicked(event: any) { console.log('event.data.IdE', event.data.idE); let ide = event.data.idE; return ide; }

}
