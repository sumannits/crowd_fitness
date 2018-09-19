import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, Validators, FormGroup ,ValidatorFn} from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Helpers } from "../../../helpers/helpers";
import { SnotifyComponent } from "../../../helpers/snotify.component";
import { MatFileUploadComponent } from '@webacad/ng-mat-file-upload';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      let isValid=control.root.value[field_name]==input
      if(!isValid){
        return { 'equalTo': {isValid} }
      } else {
        return null;
      }
    };
  }
  public hide : boolean = true;
  public hidecon : boolean = true;
  public isTrainerChecked:boolean = false;
  public useradd:FormGroup;
  public fileimage : any;
  public file:  Array<File> = [];
  filesToUpload: Array<File> = [];
  public isChecked:boolean =true;
  constructor(private userservice :UsersService,private router: Router,private snotify: SnotifyComponent,cd: ChangeDetectorRef) { 
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.useradd = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      about: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern(EMAILPATTERN)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      conf_pass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), this.equalto('password')]),
      phone:new FormControl(''),
      service:new FormControl(''),
      status: new FormControl(''),
      trainer:new FormControl('')
    });
    this.useradd.controls['status'].setValue(true);
    this.useradd.controls['trainer'].setValue(false);
  }

  ngOnInit() {

  }

  public adduser(values): void {
    Helpers.setLoading(true);
    if(this.useradd.valid){
      delete values.conf_pass;
      values.is_delete = false;
      //console.log(values);
      this.userservice.addUser(values).then(res => {
        Helpers.setLoading(false);
        this.snotify.snotifysuccess('User Added Sucessfully','Success');
        this.router.navigateByUrl('admin/users')
        //Helpers.setLoading(false);
        //this.snotify.snotifyerror('Something Went Wrong! Try Again','Error');
      });
    } else {
      Helpers.setLoading(false);
      this.snotify.snotifyerror('From Validation Error! Try Again','Error');
    }
  }

  public onFileChange(fileUpload: MatFileUploadComponent): void
  {
    let reader = new FileReader();
    const files = fileUpload.files;
    if (!files.length) {
      this.fileimage = [];
    } else {
      this.fileimage = files[0].file;
    }
  }

  updateTrainerChecked(event){
    if(event.checked == true){
      this.isTrainerChecked = true;
      this.useradd.controls['trainer'].setValue(true);
    } else {
      this.isTrainerChecked = false;
      this.useradd.controls['trainer'].setValue(false);
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
