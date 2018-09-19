import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string){
    
    firebase.auth().signInWithEmailAndPassword(username, password).then((user) => {
      //return firebase.auth().currentUser;
      localStorage.setItem('access_token', firebase.auth().currentUser.uid);
      //console.log(firebase.auth().currentUser.uid);
      return true;
    }).catch((err) => {
      //return err;
      return false;
    })
    // const headers = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
    // };
    // var data = "email=" + username + "&password=" + password;
    // return this.http.post<{token: string,success: boolean}>( environment.api_url + 'api/signin', data ,headers)
    // .pipe(map(result => {
    //     if(result.success == true){
    //       localStorage.setItem('access_token', result.token);
    //       return true;
    //     }
    //     return false;
    //   })
    // );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
