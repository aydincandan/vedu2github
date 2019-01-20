import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_data/servisler/auth.service";
import { AlertifyService } from '../_data/servisler/alertify.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  subscribeERR: any = {}
  showADMopt: boolean = true

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private alertifyService: AlertifyService) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.showADMopt = params['showADMopt'];
      console.log("showADMopt: ", this.showADMopt); // Print the parameter to the console. 
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    );


  }

  registerForm: FormGroup;
  registerUser: any = {}
  ngOnInit() {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        kisiTipi: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(18)]],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    )
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true }
  }

  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value)

      //this.authService.KisiRegister(this.registerUser)
      // kişi conflict ile karşılaşırsa (15 saniye gibi bir süre içerisinde güvenlik içinmi buna gerek var) login le birlikte kendini içeride bulsun !

      this.authService.KisiRegister(this.registerUser)
        .subscribe(data => { console.log("data = " + JSON.stringify(data));
          this.alertifyService.success("TEBRİKLER " + data.myRequestObject.email + " KAYIT OLDUNUZ :-> " + data.modelStateAddedErrors[0].errorMessage)
        }
          , xError => {
            this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error.modelStateAddedErrors[0].errorMessage; // YetkisizlikMetkisizlik
            console.log("ooops:", this.subscribeERR)
            this.alertifyService.error(this.subscribeERR);
          }
        );
    }
  }
}
