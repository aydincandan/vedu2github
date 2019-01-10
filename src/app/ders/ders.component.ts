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
  public columnDefs: any;
  rowDatas1 = [];
  public rowSelection: any;

  constructor(private dersService: DersService, private activatedRoute: ActivatedRoute, private alertifyService: AlertifyService) {
    this.columnDefs = [
      { headerName: 'ID', field: 'idE' },
      { headerName: 'TITLE', field: 'title', editable:true },
      { headerName: 'dersDetaylar', field: 'dersDetaylar' },
      { headerName: 'kisininDersleri', field: 'kisininDersleri' },
    ];

    this.rowSelection = "multiple";

  }

  fillAgGrid1() {
    this.dersService.getDersler().subscribe(data => { this.rowDatas1 = data }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

  ngOnInit() {
    this.fillAgGrid1()

    this.activatedRoute.params.subscribe(params => {
      let xx: number = params["ID"]
      console.log("param : " + xx)
      if (xx)
        this.getDers(xx);
      else
        this.getDersler();
    }
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
  getDersler() {
    this.dersService.getDersler().subscribe(data => { this.dersler = data }
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
  }
  YeniDersiEkle() {
    var rowData = [];
    this.gridApi.forEachNode(function(node) {
      rowData.push(node.data);
    });
    console.log("-----------Row Data:------------");
    console.log(rowData);
    for (let index = 0; index < rowData.length; index++) {
      if(rowData[index].idE==undefined)console.log(rowData[index]);
    }
    return;
    
    this.myDynFormGroup=new FormGroup({
      title: new FormControl("gggggg yy"),
      ID: new FormControl("123")
    });

    if (this.myDynFormGroup.valid) {

      let DERS: any = Object.assign({}, this.myDynFormGroup.value);

      console.log("sendUpdateValues:", DERS)

      this.dersService.addDers(DERS)
    }
  }
  clearData() {this.gridApi.setRowData([]);}

  onAddRow() {
    
    var newItem = createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
    printResult(res);

    function createNewRowData() {
      var newData = {
        idE: undefined, // bilemeyiz
        title: "Yeni bir Ders giriniz..",
        dersDetaylar: [],
        kisininDersleri: []
      };
      return newData;
    }
    function printResult(res) {
      console.log("---------------------------------------");
      if (res.add) {
        res.add.forEach(function(rowNode) {
          console.log("Added Row Node", rowNode);
        });
      }
      if (res.remove) {
        res.remove.forEach(function(rowNode) {
          console.log("Removed Row Node", rowNode);
        });
      }
      if (res.update) {
        res.update.forEach(function(rowNode) {
          console.log("Updated Row Node", rowNode);
        });
      }
    }

  }
  
  onGridReady(event: any) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
  }

  removeSelected() {
    var selectedData = this.gridApi.getSelectedRows();

    for (var i in selectedData) {
      console.log(i + ' = ' + selectedData[i].idE);
      this.delDers(selectedData[i].idE);
    }

    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log("res", res);
  }
  delDers(aydi: number) {
    this.dersService.delDers(aydi).subscribe(data => {
      this.alertifyService.success(aydi + " silindi.");
    }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
  }

}
