import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
//import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UsersService {
  constructor(
    //private apiService: ApiService,
    //private db: AngularFirestore,
  ) {}
  //Get All User List
  getUserList(){
    let userDb = firebase.database().ref("users");
    return userDb.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  //  this.db.collection('users', ref => {
  //     return ref;
  //   }).snapshotChanges().map(actions => {
  //     return actions.map(action => {
  //       const data = action.payload.doc.data();
  //       const id = action.payload.doc.id;
  //       return { id, ...data };
  //     });
  //   });

    // return firebase.database().ref('users/').on('child_added', (snapshot) => {
    //   //console.log(snapshot.val());
    //   return snapshot.val();
    //     // firebase.database().ref('users/'+snapshot.val().lastchat.otherid).once('value', (chatedsnapshot) => {
    //     //   console.log(snapshot.val().lastchat.message);
    //     //   var data = {
    //     //       'gid' : snapshot.key,
    //     //       'message' : snapshot.val().lastchat.message,
    //     //       'otherid' : snapshot.val().lastchat.otherid,
    //     //       'seen' : snapshot.val().lastchat.seen,
    //     //       'sendername' : chatedsnapshot.val().name,
    //     //       'senderimage': chatedsnapshot.val().picture
    //     //   }
    //     //   this.setState((prevState) => ({
    //     //       chatlist: [...prevState.chatlist, data],
    //     //   }));
        
    //     // });
    // });
  }

  //Delete user
  deleteUser(id) {
    return firebase.database().ref('users/' + id).update({is_delete:true});
  }
  //Add User
  addUser(form_data) {
    if(form_data.email !='' && form_data.password !=''){
      return firebase.auth().createUserWithEmailAndPassword(form_data.email, form_data.password).then((res) => {
        //console.log(res.user.uid);
        let uid = res.user.uid;
        delete form_data.password;
        firebase.database().ref('users/'+uid).set(form_data);
      }).catch((err) => {
        return err;
      })
    }else{
      //return false;
    }
    
    //

  }


  //Get Template Details
  getUserDetails(id){
    let userDb = firebase.database().ref("users/"+id);
    return userDb.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  //Edit Template
  editUser(form_data, userId) {
    return firebase.database().ref('users/' + userId).update(form_data);
  }

  

} 