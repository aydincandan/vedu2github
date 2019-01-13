import { Component, OnInit } from '@angular/core';
import { __Ders } from '../_data/modeller/hepsi.model';
import { DersService } from "../_data/servisler/ders.service";
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_data/servisler/alertify.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css'],
  providers: [DersService]
})
export class DersComponent implements OnInit {
  subscribeERR: any = {}
  get RoleNAME() { return localStorage.getItem("RoleNAME") }
  private gridApi;
  private gridColumnApi;
  private overlayLoadingTemplate;
  public columnDefs: any;
  rowDatas1 = [];
  public rowSelection: any;

  constructor(private dersService: DersService, private activatedRoute: ActivatedRoute, private alertifyService: AlertifyService) {
    this.columnDefs = [
      { headerName: 'ID', field: 'idE' },
      { headerName: 'TITLE', field: 'title', editable: true },
      { headerName: 'dersDetaylar', field: 'dersDetaylar' },
      { headerName: 'kisininDersleri', field: 'kisininDersleri' },
    ];

    this.rowSelection = "multiple";
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }

  ngOnInit() {
    this.fillAgGrid1()

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      // console.log("param : " + xx)
      // if (xx)
      //   this.getDers(xx);
      // else
      //   this.getDersler();
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  fillAgGrid1() {
    this.dersService.getDersler().subscribe(data => { this.rowDatas1 = data; setTimeout(() => {this.gridApi.hideOverlay();}, 600); }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  dersler: __Ders[]

  getDers(xx: number) {
    this.dersService.getDers(xx).subscribe(data => { this.dersler = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  ide: number
  onRowClicked(event: any) {
    console.log('event.data.IdE', event.data.idE);
    let ide = event.data.idE;
    return ide;
  }

  myDynFormGroup: FormGroup;
  aPersonUpdate: any = {}

  dersNewData: any = {}
  YeniDersGir() {
    this.onAddRow();
    // this.YeniDersiEkle()
  }

  // takip et başvur : https://www.ag-grid.com/javascript-grid-api/
  // ayrıca buda var : https://www.ag-grid.com/javascript-grid-properties/
  
  ReFreshGrid(){
    this.gridApi.showLoadingOverlay();
    this.fillAgGrid1();
  }
  
  YeniDersiEkle() {

    var mevcutrowData = [];
    
    this.gridApi.forEachNode(function (node) { mevcutrowData.push(node.data); });

    // console.log("-----------Row Data:------------");
    // console.log(rowData);
    // console.log("-----------Row Data:------------");

    var kacadetadd = 0
    for (let index = 0; index < mevcutrowData.length; index++) {
      if (mevcutrowData[index].idE == undefined) {
        // var ayd = this.dersService.addDers(mevcutrowData[index]); // *** buraya eş ***
        // this.dersService.addDers2(mevcutrowData[index]); // *** buraya eş ***
        //let dersAydi:__Ders = 
        this.dersService.addDers(mevcutrowData[index]).subscribe(sonuc=>{
          console.log("--donus : ", sonuc.idE)
        })
        kacadetadd++;
      }
    }
    if (kacadetadd > 0) {
      setTimeout(() => {
        this.gridApi.showLoadingOverlay();
        this.fillAgGrid1();
      }, 600);
    }
    return;

    this.myDynFormGroup = new FormGroup({
      title: new FormControl("gggggg yy"),
      ID: new FormControl("123")
    });

    if (this.myDynFormGroup.valid) {

      let DERS: any = Object.assign({}, this.myDynFormGroup.value);

      console.log("sendUpdateValues:", DERS)

      this.dersService.addDers(DERS); // *** buraya eş ***
    }
  }
  
  ClearGrid() { 
    this.gridApi.setRowData([]); 
  }

  onAddRow() {

    var grc = this.gridApi.getDisplayedRowCount();
    var newItem = createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
    // printResult(res);

    function createNewRowData() {
      var newData = {
        idE: undefined, // bilemeyiz
        title: "#" + (grc + 1) + " Yeni bir Ders adı giriniz..",
        dersDetaylar: [],
        kisininDersleri: []
      };
      return newData;
    }
    function printResult(res) {
      console.log("---------------------------------------");
      if (res.add) {
        res.add.forEach(function (rowNode) {
          console.log("Added Row Node", rowNode);
        });
      }
      if (res.remove) {
        res.remove.forEach(function (rowNode) {
          console.log("Removed Row Node", rowNode);
        });
      }
      if (res.update) {
        res.update.forEach(function (rowNode) {
          console.log("Updated Row Node", rowNode);
        });
      }
    }

  }

  onGridReady(event: any) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.gridApi.showLoadingOverlay();
    // this.alertifyService.error("onGridReady");
    this.gridApi.sizeColumnsToFit();
  }

  removeSelected() {
    var selectedData = this.gridApi.getSelectedRows();

    var silindiaydiler=""; var silindisayisi=0;
    for (var i in selectedData) {
      console.log(i + ' = ' + selectedData[i].idE);
      this.delDers(selectedData[i].idE);
      silindiaydiler+=selectedData[i].idE+", ";
      silindisayisi++;
    }

    this.alertifyService.success(silindisayisi + " adet kayıt silindi. Silinenler => " + silindiaydiler);

    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log("updateRowData return : ", res);
  }
  
  delDers(aydi: number) {
    this.dersService.delDers(aydi).subscribe(data => {
      // this.alertifyService.success(aydi + " silindi.");
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

}
