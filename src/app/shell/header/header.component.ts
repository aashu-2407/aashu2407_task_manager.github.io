import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ` <div class="header-title">
    <div class="mx-auto container nav-bar">
      <div class="header-name bold">
        <a
          routerLink="/"
          routerLinkActive="active"
          class="bold nav-text"
          >Task manager app</a
        >
      </div>
      <div>
        <a
          routerLink="/task-list"
          routerLinkActive="active"
          class="bold nav-text"
          >Tasks List</a
        >
      </div>
    </div>
  </div>`,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
