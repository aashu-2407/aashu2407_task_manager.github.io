import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="text-center footer-margin">
      <span>Powered by <i>Devza</i> &copy; copyright {{ yearRange }}</span>
    </div>
  `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  private year = new Date().getFullYear();
  yearRange = this.year > 2020 ? `2020-${this.year}` : '2020'; //year will change dynamically
}
