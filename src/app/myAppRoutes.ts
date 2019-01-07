import { OgrenciComponent } from "./ogrenci/ogrenci.component";
import { DersComponent } from "./ders/ders.component";
import { Routes } from "@angular/router";
import { OgretmenComponent } from "./ogretmen/ogretmen.component";
import { AdminComponent } from "./admin/admin.component";
import { TakvimComponent } from "./takvim/takvim.component";
import { RegisterComponent } from "./register/register.component";
import { WelcomeComponent } from "./welcome/welcome.component";

import { SiltestComponent } from './siltest/siltest.component';

export const myAppRoutes: Routes = [
    { path: "siltest", component: SiltestComponent },

    { path: "ogrenci", component: OgrenciComponent },
    { path: "ogrenci/:iD", component: OgrenciComponent },
    { path: "ogrenci/d/:iD", component: OgrenciComponent },
    { path: "ogrenci/detail/:iD", component: OgrenciComponent },
    { path: "ogrenci/add", component: OgrenciComponent },
    { path: "ogrenci/edit/:iD", component: OgrenciComponent },
    { path: "ogrenci/delete/:iD", component: OgrenciComponent },
    
    { path: "ogretmen", component: OgretmenComponent },
    
    { path: "ders", component: DersComponent },
    
    { path: "takvim", component: TakvimComponent },
    
    { path: "admin", component: AdminComponent },

    { path: "register", component: RegisterComponent },
    { path: "welcome", component: WelcomeComponent },

    { path: "**", redirectTo: "welcome", pathMatch: "full" }, // bu en altta olacak!
    
]
