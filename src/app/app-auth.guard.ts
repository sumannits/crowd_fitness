import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      this.router.navigate(['admin'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
