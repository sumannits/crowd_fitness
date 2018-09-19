import { Component, OnInit , ViewEncapsulation, AfterViewInit} from '@angular/core';
import { Helpers } from '../../helpers/helpers';
declare let mLayout: any;
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit , AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit()  {

    mLayout.initAside();
    
  }

}
