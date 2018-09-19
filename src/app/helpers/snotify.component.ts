import { Injectable } from '@angular/core';
import {SnotifyService} from 'ng-snotify';
@Injectable()
export class SnotifyComponent {
  constructor(private snotifyService: SnotifyService) {}

  snotifysuccess(message,title){
    this.snotifyService.success(message, title, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position:"rightTop"
    });
  }

  snotifyerror(message,title){
    this.snotifyService.error(message, title, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position:"rightTop"
    });
  }

}
