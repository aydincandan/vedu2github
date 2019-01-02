export class testdata { make: string; model: string; price: string }

// Auth için (D)ata(T)ransfer(O)bject lerim
export class UserForRegisterDto {
    UserName: string
    Password: string
    kisiTipi: string
    email: string
}
export class UserForLoginDto {
    email: string
    UserName: string
    Password: string
}
export class ogretmenUpdateDto {
    IdE: number
    UzmanlikAlanlari:string
    Username:string
    Adi:string
    Soyadi:string
    TCkimlik:string
    telefon1: string
}
export class ogrenciUpdateDto {
    IdE: number
    IlgiAlanlari:string
    Username:string
    Adi:string
    Soyadi:string
    TCkimlik:string
    telefon1: string
}
export class adminUpdateDto {
    IdE: number
    YetkiSeviye:string
    Username:string
    Adi:string
    Soyadi:string
    TCkimlik:string
    telefon1: string
}
// entity objelerim
export class __Kisi {
    IdE: number
    KISITIPI: string
    Email: string
    UserName: string
    adi: string
    soyadi: string
    tckimlik: string
    UzmanlikAlanlari: string ; IlgiAlanlari:string ; YetkiSeviye:string
    Sirano: number
    tumtelefonlari: []
    tumadresleri: []
    telefon1: string
    adres1: string
}
export class __Ders {
    ID: number
    title: string
}
export class __DersDetay {
    ID: number
    aciklama: string
    dersID: number
    sirano: number
}
export class __Icerik {
    ID: number
    belgeAciklama: string
    belgeAdi: string
    belgeLink: string
    dersID: number
    ogretmenID: number
    sirano: number
}
export class __Takvim {
    ID: number
    dersDetayID: number
    dersZamani: Date
    ogretmenID: number
    takvimAciklama: string
    sirano: number
}
export class __Admin {
    yetkiSeviyesi: number
    ID: number
    _address: string
    _email: string
    _name: string
    _passWord: string
    _passWordSalt: string
    _surName: string
    _telefon: string
    _userName: string
}
