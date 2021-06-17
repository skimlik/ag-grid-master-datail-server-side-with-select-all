import { Component, OnDestroy, VERSION } from '@angular/core';
import {
  ColDef,
  GridOptions,
  GridReadyEvent,
  GridApi,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  CellEvent,
  RowNode, ServerSideStoreType
} from 'ag-grid-community';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IEntity } from './entity';
import { DataService } from './server.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private _unsubscribe = new Subject<void>();

  rowData: IEntity[] = [];
  columnDefs: ColDef[] = [
    {
      colId: 'id',
      field: 'id',
      headerName: 'Id',
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      colId: 'name',
      field: 'name',
      headerName: 'Name'
    },
    {
      colId: 'year',
      field: 'year',
      headerName: 'year'
    },
    {
      colId: 'actions',
      headerName: '',
      valueGetter: params => (params.node.expanded ? 'Close' : 'Details'),
      cellClass: () => 'button-link',
      onCellClicked: (params) => {
         const parentComponent = params.context?.parentComponent;
         if (parentComponent) {
           parentComponent.toggleDetailsSection(params);
         }
      }
    }
  ];
  gridOptions: GridOptions = {
    rowModelType: 'serverSide',
    suppressContextMenu: true,
    serverSideStoreType: ServerSideStoreType.Partial,
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'multiple',
    masterDetail: true,
    context: { parentComponent: this },
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [{ field: 'name' }, { field: 'year' }]
      },
      getDetailsRowData: (params) => {
        params.successCallback(params.data.details);
      }
    },
  };

  gridApi: GridApi;

  constructor(private server: DataService) {}

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  getRowNodeId(data): string {
    return data.id;
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.server
      .get()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(data => {
        params.api.setServerSideDatasource({
          getRows: (params: IServerSideGetRowsParams) => {
            console.log(params.request);

            params.success({
              rowData: data,
              rowCount: data.length
            });
          }
        } as IServerSideDatasource);
      });
  }

  toggleDetailsSection(event: CellEvent): void {
    const data = event.data;
    if (!data || !data.id) {
      return;
    }

    const rowNode: RowNode = event.node;
    rowNode.setExpanded(!rowNode.expanded);
    event.api.refreshCells({ rowNodes: [rowNode] });
  }
}
