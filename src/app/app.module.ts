import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router";
import { DatePipe } from '@angular/common'

import { myAppRoutes } from "./myAppRoutes"

import { AppComponent } from './app.component';

import { AdminComponent } from './admin/admin.component';
import { OgrenciComponent } from './ogrenci/ogrenci.component';
import { OgretmenComponent } from './ogretmen/ogretmen.component';
import { DersComponent } from './ders/ders.component';
import { DersDetayComponent } from './ders/dersDetay/dersDetay.component';
import { TakvimComponent } from './takvim/takvim.component';
import { RegisterComponent } from './register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertifyService } from './_data/servisler/alertify.service';
import { AuthService } from "./_data/servisler/auth.service"
import { AdminService } from "./_data/servisler/admin.service"
import { OgrenciService } from "./_data/servisler/ogrenci.service"
import { OgretmenService } from "./_data/servisler/ogretmen.service"
import { DersService } from "./_data/servisler/ders.service"
import { TakvimService } from "./_data/servisler/takvim.service"

import { NavComponent } from './nav/nav.component';
import { AgGridModule } from 'ag-grid-angular';
import { WelcomeComponent } from './welcome/welcome.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
   declarations: [
      AppComponent,
      AdminComponent,
      OgrenciComponent,
      OgretmenComponent,
      DersComponent,
      DersDetayComponent,
      TakvimComponent,
      RegisterComponent,
      NavComponent,
      WelcomeComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(myAppRoutes),
      FormsModule,
      ReactiveFormsModule,
      AgGridModule.withComponents(null),
      SlimLoadingBarModule
   ],
   providers: [
      DatePipe,
      //AlertifyService,
      //AuthService,
      //AdminService,
      //OgrenciService,
      //OgretmenService,
      //DersService,
      //TakvimService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
