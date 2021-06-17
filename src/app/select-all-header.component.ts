import { Component } from '@angular/core';
import { IHeaderAngularComp } from "ag-grid-angular";
import { IHeaderParams } from "ag-grid-community";

@Component({
  templateUrl: 'select-all-header.component.html'
})

export class SelectAllHeaderComponent implements IHeaderAngularComp {
  private _params: IHeaderParams;

  constructor() {
  }

  agInit(params: IHeaderParams): void {
    this._params = params;
  }

  refresh(params: IHeaderParams): boolean {
    return false;
  }

  get displayName(): string {
    return this._params?.displayName || '';
  }

  get isActive(): boolean {
    return true;
  }
}
