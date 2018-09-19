import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, Validators, FormGroup ,ValidatorFn} from '@angular/forms';
import { CategoryService } from '../category-service';
import { Router } from '@angular/router';
import { Helpers } from "../../../helpers/helpers";
import { SnotifyComponent } from "../../../helpers/snotify.component";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public useradd:FormGroup;
  public isChecked:boolean =true;

  constructor(
    private catervice :CategoryService,private router: Router,private snotify: SnotifyComponent
  ) { 
    this.useradd = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      count: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description:new FormControl(''),
      status: new FormControl('')
    });
    this.useradd.controls['status'].setValue(true);
  }

  ngOnInit() {
  }

  public adduser(values): void {
    Helpers.setLoading(true);
    if(this.useradd.valid){
      //console.log(values);
      this.catervice.addData(values).then(res => {
        Helpers.setLoading(false);
        this.snotify.snotifysuccess('Category Added Sucessfully','Success');
        this.router.navigateByUrl('admin/category')
        //Helpers.setLoading(false);
        //this.snotify.snotifyerror('Something Went Wrong! Try Again','Error');
      });
    } else {
      Helpers.setLoading(false);
      this.snotify.snotifyerror('From Validation Error! Try Again','Error');
    }
  }

  updateChecked(event){
    if(event.checked == true){
      this.isChecked = true;
      this.useradd.controls['status'].setValue(true);
    } else {
      this.isChecked = false;
      this.useradd.controls['status'].setValue(false);
    }
  }

}
