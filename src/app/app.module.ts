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
import { NavComponent } from './nav/nav.component';
import { AgGridModule } from 'ag-grid-angular';
import { WelcomeComponent } from './welcome/welcome.component';
import { SiltestComponent } from './siltest/siltest.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
   declarations: [
      AppComponent,
      AdminComponent,
      OgrenciComponent,
      OgretmenComponent,
      DersComponent, DersDetayComponent,
      TakvimComponent,
      RegisterComponent,
      NavComponent,
      WelcomeComponent,
      SiltestComponent
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
      AlertifyService,
      DatePipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
