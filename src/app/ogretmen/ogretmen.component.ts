import { Component, OnInit } from '@angular/core';
import { __Kisi, ogretmenUpdateDto } from '../_data/modeller/hepsi.model';
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
  selector: 'app-ogretmen',
  templateUrl: './ogretmen.component.html',
  styleUrls: ['./ogretmen.component.css'],
  // providers: [OgretmenService]
})

export class OgretmenComponent implements OnInit { 
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }

  private columnDefs;
  constructor(private ogretmenService: OgretmenService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private alertifyService:AlertifyService) {
    this.columnDefs = [
      { headerName: 'TYPE', field: 'kisitipi' },
      { headerName: 'ID', field: 'idE' },
      { headerName: 'USERNAME', field: 'userName', editable: true },
      { headerName: 'EMAIL', field: 'email' },
      { headerName: 'ADI', field: 'adi' },
      { headerName: 'SOYADI', field: 'soyadi' },
      // { headerName: 'TCKIMLIK', field: 'tckimlik'},
      // { headerName: 'UZM', field: 'uzmanlikAlanlari', editable: true },
      { headerName: 'TEL', field: 'telefon1', editable: true },
      // { headerName: 'ADR', field: 'adres1', editable: true },
    ];
   }



  ngOnInit() {
    this.createOgretmenForm();
    this.getOgretmen(this.updateKisiID);
    console.log(this.rowData)

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      console.log("param : " + xx)
      if (xx)
        this.getOgretmen(xx);
      else
        this.getOgretmenler();
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
  ogretmenForm: FormGroup;
  ogretmenUpdate: any = {}

  setOgretmenForm() {
    this.ogretmenForm = this.formBuilder.group(
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

  createOgretmenForm() {
    this.ogretmenForm = this.formBuilder.group(
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

  editOgretmen() {
    if (this.ogretmenForm.valid) {
      this.ogretmenUpdate = Object.assign({}, this.ogretmenForm.value)
      console.log(this.ogretmenUpdate)
      let ogrkisi: ogretmenUpdateDto = new ogretmenUpdateDto;
      ogrkisi.IdE = this.updateKisiID;
      ogrkisi.UzmanlikAlanlari = this.ogretmenForm.value.UzmanlikAlanlari;
      ogrkisi.Username = this.ogretmenForm.value.Username;
      ogrkisi.Adi = this.ogretmenForm.value.Adi;
      ogrkisi.Soyadi = this.ogretmenForm.value.Soyadi;
      ogrkisi.TCkimlik = this.ogretmenForm.value.TCkimlik;
      ogrkisi.telefon1 = this.ogretmenForm.value.telefon1;
      this.ogretmenService.putOgretmen(ogrkisi).subscribe(fff => { console.log(fff) }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
    }
  }

  getOgretmen(xx: number) {
    this.ogretmenService.getOgretmen(xx).subscribe(data => {
      this.rowData = data;
      // console.log(this.rowData)
      this.setOgretmenForm()
    }
    , xError => {
      this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
      console.log("ooops:", this.subscribeERR)
      this.alertifyService.error(this.subscribeERR);
    }
)
  }

  getOgretmenler() { this.ogretmenService.getOgretmenler().subscribe(data => { this.rowData = data }
    , xError => {
      this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
      console.log("ooops:", this.subscribeERR)
      this.alertifyService.error(this.subscribeERR);
    }
) }

  ide: number
  onRowClicked(event: any) { console.log('event.data.IdE', event.data.idE); let ide = event.data.idE; return ide; }

}
