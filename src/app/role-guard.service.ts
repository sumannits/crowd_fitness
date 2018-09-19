import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot , RouterStateSnapshot} from '@angular/router';
import { AppAuthService } from './app-auth.service';
//import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
  public tokenpayrole: string = "";
  constructor(public auth: AppAuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('access_token');
    // decode the token to get its payload
    let tokenPayload:any;
    if(this.auth.loggedIn){
      //tokenPayload = decode(token);
      this.tokenpayrole = token;
    }
    if (!this.auth.loggedIn || this.tokenpayrole == '') {
      console.log(this.auth.loggedIn);
      this.router.navigate(['admin'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
    return true;
  }
}