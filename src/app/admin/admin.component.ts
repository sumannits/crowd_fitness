import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../services/script-loader.service';
import { AppAuthService } from '../app-auth.service';
import { Router , ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';
declare let $: any;
declare let mUtil: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  model: any = {};
  public error: string;
  public loading:boolean = false;
  return: string = '';
  constructor(private _script: ScriptLoaderService,private auth: AppAuthService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    if(!this.auth.loggedIn){
        this._script.loadScripts('body', [
        'assets/js/vendors.bundle.js',
        'assets/js/scripts.bundle.js'], true).then(() => {
            this.handleFormSwitch();
            this.handleSignInFormSubmit();
            this.handleSignUpFormSubmit();
            this.handleForgetPasswordFormSubmit();
        });
    }
      if(this.auth.loggedIn){
        this.router.navigateByUrl('admin/dashboard')
        //this.route.queryParams.subscribe(params => this.return = params['return'] || '/dashboard');
      }
  }
  signin() {
    // this.auth.login(this.model.email, this.model.password).pipe(first()).subscribe(
    //   result => this.router.navigateByUrl('admin/dashboard'),
    //   //result =>this.route.queryParams.subscribe(params => this.return = params['return'] || '/dashboard'),
    //   err => this.error
    // );
    firebase.auth().signInWithEmailAndPassword(this.model.email, this.model.password).then((user) => {
        let loginUserId=firebase.auth().currentUser.uid;
        if(loginUserId == 'QA2cJ4Acf5UUrl6AYpVXGn360GH3'){
            localStorage.setItem('access_token', loginUserId);
            this.router.navigateByUrl('admin/dashboard');
        }else{
            this.error = 'Invalid email or password';
        }
        
    }).catch((err) => {
        this.error = 'Invalid email or password';
    })
  }

  signup() {
  }

  forgotPass() {
  }


  handleSignInFormSubmit() {
    $('#m_login_signin_submit').click((e) => {
        let form = $(e.target).closest('form');
        form.validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                },
            },
        });
        if (!form.valid()) {
            e.preventDefault();
            return;
        }
    });
  }

  displaySignUpForm() {
    let login = document.getElementById('m_login');
    mUtil.removeClass(login, 'm-login--forget-password');
    mUtil.removeClass(login, 'm-login--signin');

    mUtil.addClass(login, 'm-login--signup');
    mUtil.animateClass(login.getElementsByClassName('m-login__signup')[0], 'flipInX animated');
  }

  displaySignInForm() {
    let login = document.getElementById('m_login');
    mUtil.removeClass(login, 'm-login--forget-password');
    mUtil.removeClass(login, 'm-login--signup');
    try {
        $('form').data('validator').resetForm();
    } catch (e) {
    }

    mUtil.addClass(login, 'm-login--signin');
    mUtil.animateClass(login.getElementsByClassName('m-login__signin')[0], 'flipInX animated');
  }

  displayForgetPasswordForm() {
    let login = document.getElementById('m_login');
    mUtil.removeClass(login, 'm-login--signin');
    mUtil.removeClass(login, 'm-login--signup');

    mUtil.addClass(login, 'm-login--forget-password');
    mUtil.animateClass(login.getElementsByClassName('m-login__forget-password')[0], 'flipInX animated');
  }

  handleFormSwitch() {
    document.getElementById('m_login_forget_password').addEventListener('click', (e) => {
        e.preventDefault();
        this.displayForgetPasswordForm();
    });

    document.getElementById('m_login_forget_password_cancel').addEventListener('click', (e) => {
        e.preventDefault();
        this.displaySignInForm();
    });

    document.getElementById('m_login_signup').addEventListener('click', (e) => {
        e.preventDefault();
        this.displaySignUpForm();
    });

    document.getElementById('m_login_signup_cancel').addEventListener('click', (e) => {
        e.preventDefault();
        this.displaySignInForm();
    });
  }

  handleSignUpFormSubmit() {
    document.getElementById('m_login_signup_submit').addEventListener('click', (e) => {
        let btn = $(e.target);
        let form = $(e.target).closest('form');
        form.validate({
            rules: {
                fullname: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                },
                rpassword: {
                    required: true,
                },
                agree: {
                    required: true,
                },
            },
        });
        if (!form.valid()) {
            e.preventDefault();
            return;
        }
    });
  }

  handleForgetPasswordFormSubmit() {
    document.getElementById('m_login_forget_password_submit').addEventListener('click', (e) => {
        let btn = $(e.target);
        let form = $(e.target).closest('form');
        form.validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
            },
        });
        if (!form.valid()) {
            e.preventDefault();
            return;
        }
    });
  }

}
