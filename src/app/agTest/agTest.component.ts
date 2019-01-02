import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-agTest',

  template: `<div style="height: 100%; padding-top: 35px; box-sizing: border-box;">
  <ag-grid-angular
  #agGrid
  style="width: 100%; height: 500px;"
  id="myGrid"
  [rowData]="rowData"
  class="ag-theme-balham"
  [columnDefs]="columnDefs"
  [suppressDragLeaveHidesColumns]="true"
  [enableColResize]="true"
  [defaultColDef]="defaultColDef"
  (columnPinned)="onColumnPinned($event)"
  (gridReady)="onGridReady($event)"
  ></ag-grid-angular>
</div>
000000000000000
<div class="legend-box">
  <button (click)="onPinAthlete()">Pin Athlete</button>
  <button (click)="onUnpinAthlete()">Un-Pin Athlete</button>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <span class="locked-col">&nbsp;&nbsp;&nbsp;&nbsp;</span> Position Locked Column
</div>
`
})
export class AgTestComponent implements OnInit {

  ngOnInit() {
  }

  private gridApi;
  private gridColumnApi;
  private rowData: any;

  private columnDefs;
  private defaultColDef;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        lockPosition: true,
        valueGetter: "node.rowIndex",
        cellClass: "locked-col",
        width: 40,
        suppressNavigable: true
      },
      {
        lockPosition: true,
        cellRenderer: controlsCellRenderer,
        cellClass: "locked-col",
        suppressNavigable: true
      },
      {
        field: "athlete",
        width: 150
      },
      { field: "age" },
      {
        field: "country",
        width: 150
      },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" }
    ];
    this.defaultColDef = { width: 100 };
  }

  onColumnPinned(event) {
    var allCols = event.columnApi.getAllGridColumns();
    var allFixedCols = allCols.filter(function(col) {
      return col.isLockPosition();
    });
    var allNonFixedCols = allCols.filter(function(col) {
      return !col.isLockPosition();
    });
    var pinnedCount = allNonFixedCols.filter(function(col) {
      return col.getPinned() === "left";
    }).length;
    var pinFixed = pinnedCount > 0;
    event.columnApi.setColumnsPinned(allFixedCols, pinFixed);
  }

  onPinAthlete() {
    this.gridColumnApi.setColumnPinned("athlete", "left");
  }

  onUnpinAthlete() {
    this.gridColumnApi.setColumnPinned("athlete", null);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }
}

function controlsCellRenderer() {
  return "<button>A</button><button>B</button><button>C</button>";
}