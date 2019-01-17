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
    // bu ongridready ye this.ReFreshGrid()

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

  onGridReady(event: any) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.ReFreshGrid(); // bu satır ngOnInit() in ilk satırındaydı.
    this.gridApi.sizeColumnsToFit();
  }

  ReFreshGrid() {
    this.gridApi.showLoadingOverlay(); // no rows to show gözükmesin diye
    this.fillAgGrid1();
    setTimeout(() => { this.gridApi.hideOverlay(); }, 1);
  }

  fillAgGrid1() {
    this.dersService.getDersler().subscribe(data => { this.rowDatas1 = data; }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
      , () => {
        console.log(this.rowDatas1.length + " adet Gride yüklendi.");
        console.log("----------------");
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

  // takip et başvur : https://www.ag-grid.com/javascript-grid-api/
  // ayrıca buda var : https://www.ag-grid.com/javascript-grid-properties/
  // bunu da unutma  : https://www.ag-grid.com/javascript-grid-events/
  // https://www.ag-grid.com/javascript-grid-cell-editing/#fullRowEdit

  ide: number
  onRowClicked(event: any) {
    console.log('event.data.IdE', event.data.idE);
    let ide = event.data.idE;
    return ide;
  }
  onCellValueChanged(event: any) {
    // https://www.ag-grid.com/javascript-grid-cell-editing/#event-cell-value-changed
    console.log('onCellValueChanged : ', event.data.idE);
    console.log('onCellValueChanged : ', event.data.title);
    let ide = event.data.idE;
    this.dersService.setDers(event.data.idE, event.data).subscribe(
      xReturn => { console.log("xReturn : ", xReturn) }
      , xError => {
        this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
        console.log("ooops:", this.subscribeERR)
        this.alertifyService.error(this.subscribeERR);
      }
    )
    return ide;
  }

  myDynFormGroup: FormGroup;
  aPersonUpdate: any = {}

  dersNewData: any = {}
  YeniDersGir() {
    var adet = 1;
    console.log(adet + " adet gridde yer açılıyor")
    for (var kere = 0; kere < adet; kere++) {
      this.onAddRow();
    }
    // console.log(adet + " adet db ye yazılıyor")
    // this.YeniDersleriEkle()
    // console.log(adet + " adet db ye yazılımı bitti.")
    // console.log("Şimdi db den çekilip gride set ediliyor.")
    // setTimeout(() => { this.ReFreshGrid(); }, 100);
  }

  onAddRow() {
    var grc = this.gridApi.getDisplayedRowCount();
    var newItem = createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
    // printResult(res);

    function createNewRowData() {
      var newData = {
        idE: undefined, // bilemeyiz
        title: "#" + (grc + 1) + " xYeni bir Ders adı giriniz..",
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

  YeniDersleriEkle() {

    var mevcutrowData = [];

    this.gridApi.forEachNode(function (node) { mevcutrowData.push(node.data); });

    // console.log("-----------Row Data:------------");
    // console.log(rowData);
    // console.log("-----------Row Data:------------");

    var kacadetadd = 0
    var yeninevar = []
    for (let index = 0; index < mevcutrowData.length; index++) {
      if (mevcutrowData[index].idE == undefined) {
        yeninevar[kacadetadd] = mevcutrowData[index]
        kacadetadd++
      }
    }
    // manuel durumda çoğunlukla 1 olacaktır.
    for (let index = 0; index < yeninevar.length; index++) {
      this.dersService.addDers(yeninevar[index]).subscribe(
        xReturn => {

          console.log("yeninevar[index] : ", yeninevar[index]);
          yeninevar[index] = xReturn;
          console.log("yeninevar[index] : ", yeninevar[index]);



          // var rowNode = this.gridApi.getRowNode(this.gridApi.getRowNodeId(xReturn));
          // console.log("rowNode : ",rowNode)
          // rowNode.setDataValue("idE", xReturn.idE);
          // rowNode.setData(xReturn);
        }
        , xError => {
          this.subscribeERR = xError.statusText + "(" + xError.status + ") " + xError.error;
          //console.log("ooops:", this.subscribeERR)
          //this.alertifyService.error(this.subscribeERR);
        }
        , () => {
          //console.log("now completed.");
          //setTimeout(() => { this.ReFreshGrid(); }, 100);
        }
      )

      //console.log("kacadetadd : ", kacadetadd);

      if (true) {
        //setTimeout(() => { this.ReFreshGrid(); }, 100);
      }
      else {
        // burada,
        // tüm gridi refresh yapmadan yalnızca add'lenen rowun 
        // id sini update-display yapabilmeliyiz.
        // birde : add haricinde üzerinde bulunan 
        // selected rowun update title ının enter tuşuna basılarakta güncellenebilmesini sağla
      }
    }

    // if (kacadetadd > 0) {
    //   setTimeout(() => {
    //     this.ReFreshGrid();
    //   }, 600);
    // }

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

  removeSelected() {
    var selectedData = this.gridApi.getSelectedRows();

    var silindiaydiler = ""; var silindisayisi = 0;
    for (var i in selectedData) {
      console.log(i + ' = ' + selectedData[i].idE);
      this.delDers(selectedData[i].idE);
      silindiaydiler += selectedData[i].idE + ", ";
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
