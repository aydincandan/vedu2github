
import { Component, ViewChild, OnInit } from "@angular/core";

@Component({
  selector: 'app-agTest2',
  templateUrl: './agTest2.component.html',
  styleUrls: ['./agTest2.component.scss'],
  //template: ``
})
export class AgTest2Component implements OnInit {
  ngOnInit() {
  }
  private gridApi;
  private gridColumnApi;
  private rowData: any[];

  private columnDefs;
  //private rowData;
  private rowSelection;

  constructor() {
    this.columnDefs = [
      {
        headerName: "Make",
        field: "make"
      },
      {
        headerName: "Model",
        field: "model"
      },
      {
        headerName: "Price",
        field: "price"
      },
      {
        headerName: "Zombies",
        field: "zombies"
      },
      {
        headerName: "Style",
        field: "style"
      },
      {
        headerName: "Clothes",
        field: "clothes"
      }
    ];
    this.rowData = [
      {
        make: "Toyota",
        model: "Celica",
        price: 35000,
        zombies: "Elly",
        style: "Smooth",
        clothes: "Jeans"
      },
      {
        make: "Ford",
        model: "Mondeo",
        price: 32000,
        zombies: "Shane",
        style: "Filthy",
        clothes: "Shorts"
      },
      {
        make: "Porsche",
        model: "Boxter",
        price: 72000,
        zombies: "Jack",
        style: "Dirty",
        clothes: "Padded"
      }
    ];
    this.rowSelection = "multiple";
  }

  // getRowData() {
  //   var rowData = [];
  //   this.gridApi.forEachNode(function(node) {
  //     rowData.push(node.data);
  //   });
  //   console.log("Row Data:");
  //   console.log(rowData);
  // }

  // clearData() {
  //   this.gridApi.setRowData([]);
  // }

  // onAddRow() {
  //   var newItem = createNewRowData();
  //   var res = this.gridApi.updateRowData({ add: [newItem] });
  //   printResult(res);
  // }

  // addItems() {
  //   var newItems = [createNewRowData(), createNewRowData(), createNewRowData()];
  //   var res = this.gridApi.updateRowData({ add: newItems });
  //   printResult(res);
  // }

  // addItemsAtIndex() {
  //   var newItems = [createNewRowData(), createNewRowData(), createNewRowData()];
  //   var res = this.gridApi.updateRowData({
  //     add: newItems,
  //     addIndex: 2
  //   });
  //   printResult(res);
  // }

  // updateItems() {
  //   var itemsToUpdate = [];
  //   this.gridApi.forEachNodeAfterFilterAndSort(function(rowNode, index) {
  //     if (index >= 5) {
  //       return;
  //     }
  //     var data = rowNode.data;
  //     data.price = Math.floor(Math.random() * 20000 + 20000);
  //     itemsToUpdate.push(data);
  //   });
  //   var res = this.gridApi.updateRowData({ update: itemsToUpdate });
  //   printResult(res);
  // }

  // onInsertRowAt2() {
  //   var newItem = createNewRowData();
  //   var res = this.gridApi.updateRowData({
  //     add: [newItem],
  //     addIndex: 2
  //   });
  //   printResult(res);
  // }

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    // printResult(res);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}

var newCount = 1;
function createNewRowData() {
  var newData = {
    make: "Toyota " + newCount,
    model: "Celica " + newCount,
    price: 35000 + newCount * 17,
    zombies: "Headless",
    style: "Little",
    clothes: "Airbag"
  };
  newCount++;
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