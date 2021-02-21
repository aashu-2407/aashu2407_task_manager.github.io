import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of, BehaviorSubject } from 'rxjs';
import {
  switchMap,
  shareReplay,
  debounceTime,
  tap,
  catchError,
  map,
  distinctUntilChanged,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private _loading$ = new BehaviorSubject(false);
  public loading$ = this._loading$.asObservable();
  private API_URL = environment.baseURL;
  private _searchTerm$ = new ReplaySubject<string>();

  public results$ = this._searchTerm$.asObservable().pipe(
    debounceTime(400),
    distinctUntilChanged(),
    switchMap(
      (searchTerm): Observable<any> => {
        this._loading$.next(true);
        if (searchTerm) {
          return this.http.get(`${this.API_URL}/list`).pipe(
            map((res: any) => res.tasks),
            tap((task) => {
              task.filter(
                (searchKey) =>
                  searchKey.message || searchKey.assigned_name === searchKey
              );
            })
          );
        }
        return of(null);
      }
    ),
    tap((res) => {
      this._loading$.next(false);
    }),
    shareReplay(1)
  );

  public search = (searchTerm: string) => this._searchTerm$.next(searchTerm);

  public searchAllTasks() {
    return (
      this.http.get(`${this.API_URL}/list`),
      catchError((error) => {
        return of(error);
      }),
      tap((res: any) => {
        if (res) {
          res.forEach((task) => {
            task.message = task.message;
          });
        }
      }),
      tap((res) => console.log(res))
    );
  }
}
