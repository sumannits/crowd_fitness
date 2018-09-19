import { Component , OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from "./helpers/helpers";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular5';
  globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-light m-aside-left--fixed m-aside-left--offcanvas m-aside-left--minimize m-brand--minimize m-footer--push m-aside--offcanvas-default';
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.events.subscribe((route) => {
        if (route instanceof NavigationStart) {
            Helpers.setLoading(true);
            Helpers.bodyClass(this.globalBodyClass);
        }
        if (route instanceof NavigationEnd) {
            Helpers.setLoading(false);
        }
    });
  }
}
