import { Component, OnInit , ViewEncapsulation , AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../../helpers/helpers';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { CategoryService } from '../category/category-service';
import * as firebase from 'firebase';
declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public totUser:any = 0;
  public totBook:any = 0;
  public totRev:any = 0;
  public totPkg:any = 0;
  constructor(
    private _script: ScriptLoaderService,
    private catservice: CategoryService,
    private _router: Router
  ) { }

  ngOnInit() {  
    this._script.loadScripts('body', ['assets/js/vendors.bundle.js', 'assets/js/scripts.bundle.js'], true)
    .then(result => {
        Helpers.setLoading(false);
        // optional js to be loaded once
        this._script.loadScripts('head', ['assets/vendors/fullcalendar/fullcalendar.bundle.js'], true);
        this._script.loadScripts('head',['assets/js/dashboard.js']);
        
    });
    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
          (<any>mLayout).closeMobileAsideMenuOffcanvas();
          (<any>mLayout).closeMobileHorMenuOffcanvas();
          Helpers.setLoading(true);
          // hide visible popover
          (<any>$('[data-toggle="m-popover"]')).popover('hide');
      }
      if (route instanceof NavigationEnd) {
          //init required js
          (<any>mApp).init();
          (<any>mUtil).init();
          Helpers.setLoading(false);
          // content m-wrapper animation
          let animation = 'm-animate-fade-in-up';
          $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
              $('.m-wrapper').removeClass(animation);
          }).removeClass(animation).addClass(animation);
      }
    });
  }

  ngAfterViewInit() {
    this.getCountData();
  }

  getCountData() {
    this.catservice.gettotUser().then(res => {
      this.totUser = res;
    });
    this.catservice.gettotBook().then(res => {
      this.totBook = res;
    });
    this.catservice.gettotRev().then(res => {
      this.totRev = res;
    });
    this.catservice.gettotCat().then(res => {
      this.totPkg = res;
    });
    
  }
}
