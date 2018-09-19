import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, Validators, FormGroup ,ValidatorFn} from '@angular/forms';
import { CategoryService } from '../category-service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Helpers } from "../../../helpers/helpers";
import { SnotifyComponent } from "../../../helpers/snotify.component";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public isChecked:boolean =false;
  public userId:string = '';
  public useredit:FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,private catervice :CategoryService,private router: Router,private snotify: SnotifyComponent
  ) { 
    this.useredit = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      count: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description:new FormControl(''),
      status: new FormControl('')
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['sid'];
      if(this.userId == ''){
        this.router.navigateByUrl('admin/category');
      } else {
        this.catervice.getDataDetails(this.userId).then(res => {
           //console.log(res);
            this.useredit.controls['name'].setValue(res.name);
            this.useredit.controls['count'].setValue(res.count);
            this.useredit.controls['price'].setValue(res.price);
            this.useredit.controls['time'].setValue(res.time);
            this.useredit.controls['title'].setValue(res.title);
            this.useredit.controls['description'].setValue(res.description);
            if(res.status != false){
              this.isChecked = true;
              this.useredit.controls['status'].setValue(true);
            }
        });
      }
    });
  }

  ngOnInit() {
  }

  public editdata(values): void {
    if(values.status == true){
      values.status = true;
    }else{
      values.status = false;
    }
    Helpers.setLoading(true);
    if(this.useredit.valid){
      this.catervice.editData(values, this.userId).then(res => {
        Helpers.setLoading(false);
        this.snotify.snotifysuccess('Category Updated Sucessfully','Success');
        this.router.navigateByUrl('admin/category')
      });
    } else {
      Helpers.setLoading(false);
      this.snotify.snotifyerror('From Validation Error! Try Again','Error');
    }
  }

  updateChecked(event){
    if(event.checked == true){
      this.isChecked = true;
      this.useredit.controls['status'].setValue(true);
    } else {
      this.isChecked = false;
      this.useredit.controls['status'].setValue(false);
    }
  }

}
