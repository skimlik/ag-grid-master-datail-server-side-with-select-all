import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntity } from './entity';

@Injectable({ providedIn: 'root' })
export class DataService {
  get(): Observable<IEntity[]> {
    return of([
      {
        id: 1,
        name: 'Season 1',
        year: 1992,
        details: [
          {
            name: 'Season start',
            year: 1992
          },
          {
            name: 'Season end',
            year: 1992
          }
        ]
      },
      {
        id: 2,
        name: 'Season 2',
        year: 1993,
        details: [
          {
            name: 'Season start',
            year: 1993
          },
          {
            name: 'Season end',
            year: 1993
          }
        ]
      },
      {
        id: 3,
        name: 'Season 3',
        year: 1993,
        details: [
          {
            name: 'Season start',
            year: 1993
          },
          {
            name: 'Season end',
            year: 1993
          }
        ]
      }
    ]);
  }
}
