import { Component, OnInit , AfterViewInit ,ViewChild} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../../helpers/helpers';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { MatPaginator, MatTableDataSource,MatDialog, MAT_DIALOG_DATA,MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SnotifyService } from 'ng-snotify';
import { SnotifyComponent } from "../../helpers/snotify.component";
import { CategoryService } from "./category-service";
declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,AfterViewInit {
  public allDataArr = [];
  public color:string = 'accent';
  public checked:boolean = false;
  public disabled:boolean = false;
  public displayedColumns : string[] = ['_id', 'name', 'count','price','time','title','status','actions'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _script: ScriptLoaderService,
    private _router: Router,
    private snotifyService: SnotifyService,
    private serviceData: CategoryService,
    private snotify:SnotifyComponent
  ) {
    this.getAllDataList();
     
   }

  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
    //this.getAllDataList();
  }

  getAllDataList() {
    this.serviceData.getAllList().then(res => {
      let responseProps = Object.keys(res);
      let dataCnt = 0;
      for (let prop of responseProps) { 
        if(res[prop].is_delete != true){
          dataCnt++;
          //this.useritems[prop]=res[prop];
          this.allDataArr.push({'_id':dataCnt,'name':res[prop].name, 'count':res[prop].count, 'price':res[prop].price,'time':res[prop].time,'title':res[prop].title,'status':res[prop].status,'actions':prop});
        }
      }
      //console.log(this.useritems);  
        this.dataSource = new MatTableDataSource(this.allDataArr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
