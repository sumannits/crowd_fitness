import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
//import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class CategoryService {
  constructor(
    //private apiService: ApiService,
    //private db: AngularFirestore,
  ) {}
  //Get All User List
  getAllList(){
    let userDb = firebase.database().ref("packages");
    return userDb.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  //Delete user
  deleteData(id) {
    return firebase.database().ref('packages/' + id).update({is_delete:true});
  }
  //Add User
  addData(form_data) {
    var rootRef = firebase.database().ref();
    var storesRef = rootRef.child('packages');
    var newStoreRef = storesRef.push();
    //return firebase.database().ref('packages').set(form_data);
    return newStoreRef.set(form_data);
    //return firebase.database().ref('packages').set(form_data);
  }


  //Get Template Details
  getDataDetails(id){
    let userDb = firebase.database().ref("packages/"+id);
    return userDb.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  //Edit Template
  editData(form_data, userId) {
    return firebase.database().ref('packages/' + userId).update(form_data);
  }
  
  gettotUser() {
    // return firebase.database().ref('users').on("value", function(snapshot) {
    //   return snapshot.numChildren();
    // });
    let userDb = firebase.database().ref("users");
    return userDb.once('value').then(function(snapshot) {
      return snapshot.numChildren();
    });
  }
  
  gettotBook() {
    let userDb = firebase.database().ref("bookings");
    return userDb.once('value').then(function(snapshot) {
      return snapshot.numChildren();
    });
  }
  gettotRev() {
    let userDb = firebase.database().ref("reviews");
    return userDb.once('value').then(function(snapshot) {
      return snapshot.numChildren();
    });
  }
  gettotCat() {
    let userDb = firebase.database().ref("packages");
    return userDb.once('value').then(function(snapshot) {
      return snapshot.numChildren();
    });
  }
} 