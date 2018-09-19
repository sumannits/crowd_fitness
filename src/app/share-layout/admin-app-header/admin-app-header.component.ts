import { Component, OnInit  ,AfterViewInit} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../../helpers/helpers';
import { ScriptLoaderService } from '../../services/script-loader.service';
import * as firebase from 'firebase';
declare let mLayout: any;
declare let mApp: any;
declare let mUtil: any;
@Component({
  selector: 'admin-app-header',
  templateUrl: './admin-app-header.component.html',
})
export class AdminAppHeaderComponent implements OnInit , AfterViewInit{

  constructor(private _script: ScriptLoaderService, private _router: Router) { }

  ngOnInit() {
    this._script.loadScripts('body', ['assets/js/vendors.bundle.js', 'assets/js/scripts.bundle.js'], true)
            .then(result => {
                Helpers.setLoading(false);
                // optional js to be loaded once
                this._script.loadScripts('head', ['assets/vendors/fullcalendar/fullcalendar.bundle.js'], true);
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
                // init required js
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
    mLayout.initHeader();
  }
  
  loggedout(){
    firebase.auth().signOut().then((resp) => {
        
      }).catch((error) => {
        
    });
    localStorage.removeItem('access_token');
    this._router.navigate(['admin'],{});
  }

}
