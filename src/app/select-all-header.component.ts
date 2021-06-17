import { Component } from '@angular/core';
import { IHeaderAngularComp } from "ag-grid-angular";
import { IHeaderParams } from "ag-grid-community";

@Component({
  templateUrl: 'select-all-header.component.html',
  styleUrls: ['select-all-header.component.scss']
})

export class SelectAllHeaderComponent implements IHeaderAngularComp {
  private _params: IHeaderParams;

  constructor() {
  }

  agInit(params: IHeaderParams): void {
    console.log(params);
  }

  refresh(params: IHeaderParams): boolean {
    return false;
  }

  onClick(event: MouseEvent): void {
    this.onSortRequested('desc', event);
  }

  onSortRequested(order: string, event: MouseEvent | KeyboardEvent) {
    this._params.setSort(order, event.shiftKey);
  }

  get displayName(): string {
    return this._params?.displayName || '';
  }

  get isActive(): boolean {
    return true;
  }
}
