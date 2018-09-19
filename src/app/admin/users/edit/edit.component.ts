import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, Validators, FormGroup ,ValidatorFn} from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Helpers } from "../../../helpers/helpers";
import { SnotifyComponent } from "../../../helpers/snotify.component";
import { MatFileUploadComponent } from '@webacad/ng-mat-file-upload';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
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
  public useredit:FormGroup;
  public fileimage : any;
  public file:  Array<File> = [];
  filesToUpload: Array<File> = [];
  public isChecked:boolean =false;
  public userId:string = '';
  constructor(private activatedRoute: ActivatedRoute,private userservice :UsersService,private router: Router,private snotify: SnotifyComponent,cd: ChangeDetectorRef) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.useredit = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      about: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern(EMAILPATTERN)]),
      phone:new FormControl(''),
      service:new FormControl(''),
      //password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      //conf_pass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), this.equalto('password')]),
      status: new FormControl(''),
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['uid'];
      if(this.userId == ''){
        this.router.navigateByUrl('admin/users');
      } else {
        this.userservice.getUserDetails(this.userId).then(res => {
           //console.log(res);
            this.useredit.controls['name'].setValue(res.name);
            this.useredit.controls['about'].setValue(res.about);
            this.useredit.controls['email'].setValue(res.email);
            this.useredit.controls['phone'].setValue(res.phone);
            this.useredit.controls['service'].setValue(res.service);
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

  public edituser(values): void {
    if(values.status == 1){
      values.status = true;
    }else{
      values.status = false;
    }
    //console.log('Valus',values);
    Helpers.setLoading(true);
    if(this.useredit.valid){
      //delete values.conf_pass;
      this.userservice.editUser(values, this.userId).then(res => {
        Helpers.setLoading(false);
        this.snotify.snotifysuccess('User Updated Sucessfully','Success');
        this.router.navigateByUrl('admin/users')
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

  updateChecked(event){
    if(event.checked == true){
      this.isChecked = true;
      this.useredit.controls['status'].setValue('1');
    } else {
      this.isChecked = false;
      this.useredit.controls['status'].setValue('0');
    }
  }

}
