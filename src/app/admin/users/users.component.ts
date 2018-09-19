import { Component, OnInit , AfterViewInit ,ViewChild} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../../helpers/helpers';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { UsersService } from './users.service';
import { MatPaginator, MatTableDataSource,MatDialog, MAT_DIALOG_DATA,MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SnotifyService } from 'ng-snotify';
import { SnotifyComponent } from "../../helpers/snotify.component";
declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,AfterViewInit {

  public useritems = [];
  public color:string = 'accent';
  checked:boolean = false;
  disabled:boolean = false;
  //displayedColumns : string[] = ['select','_id', 'name', 'email','created','status','actions'];
  displayedColumns : string[] = ['select', '_id', 'name', 'email','phone','status','actions'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _script: ScriptLoaderService,private _router: Router,private userservice :UsersService,private snotifyService: SnotifyService
  ,private snotify:SnotifyComponent) {
    //console.log(this.userservice.getUserList());
    this.getAllUserList();
  }
  
  getAllUserList(){
    this.userservice.getUserList().then(res => {
      let responseProps = Object.keys(res);
      let dataCnt = 0;
      for (let prop of responseProps) { 
        if(res[prop].is_delete != true){
          dataCnt++;
          //this.useritems[prop]=res[prop];
          this.useritems.push({'_id':dataCnt,'name':res[prop].name, 'email':res[prop].email, 'phone':res[prop].phone,'actions':prop,'trainer':res[prop].trainer,'status':res[prop].status});
        }
      }
      //console.log(this.useritems);  
        this.dataSource = new MatTableDataSource(this.useritems);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id){
    if(id !=''){
      this.snotifyService.confirm('Please click yes if you want to delete', 'Are You Sure?', {
        //timeout: 4000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        position:'centerCenter',
        buttons: [
          {text: 'Yes', action: (toast) => {
            this.snotifyService.remove(toast.id); 
            Helpers.setLoading(true);
            this.userservice.deleteUser(id).then(res => {
              Helpers.setLoading(false);
              this.snotify.snotifysuccess('User Deleted Sucessfully','Success');
              //this.getAllUserList();
              this._router.navigateByUrl('admin/users');
            });
          }, bold: false},
          {text: 'No', action: (toast) => {this.snotifyService.remove(toast.id); }, bold: true},
        ]
      });
    } else {
      this.snotify.snotifyerror('No User Found! Try Again','Error');
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
