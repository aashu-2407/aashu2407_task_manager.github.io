import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.scss'],
})
export class SearchTaskComponent implements OnInit {
  constructor(public search: SearchService) {}

  private _focused$ = new BehaviorSubject(false);
  public focused$ = this._focused$.asObservable();

  ngOnInit(): void {}

  focusin(event: Event) {
    event.stopPropagation();
    this._focused$.next(true);
  }

  focusout(event: Event) {
    event.stopPropagation();
    this._focused$.next(false);
  }
}
