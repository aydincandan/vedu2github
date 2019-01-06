//
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-adminForm',
  templateUrl: './adminForm.component.html',
  styleUrls: ['./adminForm.component.scss']
})
export class AdminFormComponent implements OnInit {

  // @Input('dynrol') 
  private dynrol: string = "STU"

  myDynFormGroup: FormGroup

  formTitle = 'Sabit Bilgileri'
  buttonText = 'Tamam'


  //** Ortak alanlar */
  UsernameCtrl = new FormControl('', Validators.required)
  AdiCtrl = new FormControl('', Validators.required)
  SoyadiCtrl = new FormControl('', Validators.required)
  TCkimlikCtrl = new FormControl('', [Validators.minLength(11), Validators.maxLength(11)])
  telefon1Ctrl = new FormControl('', [Validators.minLength(10), Validators.maxLength(10)])

  /** Kosullu olarak olusturulacaklar */
  roleOzelAlan: FormControl

  constructor(private fb: FormBuilder) {

    this.myDynFormGroup = fb.group({
      Username: this.UsernameCtrl,
      Adi: this.AdiCtrl,
      Soyadi: this.SoyadiCtrl,
      TCkimlik: this.TCkimlikCtrl,
      telefon1: this.telefon1Ctrl
    })

  }

  ngOnInit() {
    console.log("this.dynrol----------------------------------------------",this.dynrol)
    if (this.dynrol == 'ADM' || !this.dynrol) {
      this.buttonText = 'Tamam';
      this.formTitle = 'Yönetici Sabit Bilgileri';

      this.roleOzelAlan = new FormControl('yönetici yetki seviyesi')

      /** Gruba ekle*/
      this.myDynFormGroup.addControl("YetkiSeviye", this.roleOzelAlan)
    }
    else if (this.dynrol == 'STU') {
      this.buttonText = 'Tamam';
      this.formTitle = 'Öğrenci Sabit Bilgileri';

      this.roleOzelAlan = new FormControl('öğrenci ilgi alanları')

      /** Gruba ekle*/
      this.myDynFormGroup.addControl("IlgiAlanlari", this.roleOzelAlan)
    }
    else if (this.dynrol == 'TEA') {
      this.buttonText = 'Tamam';
      this.formTitle = 'Öğretmen Sabit Bilgileri';

      this.roleOzelAlan = new FormControl('öğretmen uzmanlık alanları')

      /** Gruba ekle*/
      this.myDynFormGroup.addControl("UzmanlikAlanlari", this.roleOzelAlan)
    }

  }

  private handleForm() {
    console.log(this.myDynFormGroup.value)

    let formBu = this.myDynFormGroup.value;

    console.log(this.dynrol + " Formu1 : ", formBu)

    if (this.dynrol == 'ADM') {
      console.log(this.dynrol + " Formu2 : ", formBu)
    }
    else if (this.dynrol == 'STU') {
      console.log(this.dynrol + " Formu2 : ", formBu)
    }
    else if (this.dynrol == 'TEA') {
      console.log(this.dynrol + " Formu2 : ", formBu)
    }


  }


}
