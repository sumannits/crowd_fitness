import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable()
export class BookingService {
  constructor(
    
  ) {}
  //Get All User List
  getAllBookingList(){
    let userDb = firebase.database().ref("bookings");
    return userDb.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  getBookingDetails(bid){
    let data:any = {};
    let userDb = firebase.database().ref("bookings/"+bid);

    userDb.once('value', (snapshot) => {
      //snapshot.forEach((snapshot) => {
        let respData = snapshot.val();
        data.price = respData.price;
        data.startdate = respData.startdate;
        data.starttime = respData.starttime;
        data.status = respData.status;
        data.timeStamp = respData.timeStamp;
        data.trainer = respData.trainer;
        data.user = respData.user;
        firebase.database().ref("users/"+data.user).once('value').then(function(bookingsnapshot) {
        //firebase.database().ref("users/"+data.user).once('value', (bookingsnapshot) => {
          let respUserData = bookingsnapshot.val();
          if(respUserData != null){
            data.user_email = respUserData.email;
            data.user_name = respUserData.name;
            data.user_phone = respUserData.phone;
            data.user_service = respUserData.service;
            data.user_about = respUserData.about;
          }
        });

        firebase.database().ref("users/"+data.trainer).once('value').then(function(trainer) {
          //firebase.database().ref("users/"+data.trainer).once('value', (trainer) => {
            let respTraData = trainer.val();
            // if(tdy > bookingsnapshot.val().startfrom && bookingsnapshot.val().price == 60){
            //   var status = 'Active';
            // }else if(tdy < bookingsnapshot.val().startfrom){
            //   var status = 'Completed';
            // }else if(tdy == bookingsnapshot.val().startfrom){
            //   var status = 'In Progress';
            // }else{
            //   var status = 'Inactive';
            // }
            if(respTraData != null){
              data.trainer_email = respTraData.email;
              data.trainer_name = respTraData.name;
              data.trainer_phone = respTraData.phone;
              data.trainer_service = respTraData.service;
              data.trainer_about = respTraData.about;
            }
           
        });
        console.log(data);
        return data;
      //});

    });




    // userDb.once('value').then(function(snapshot) {
    //   let bookDet = snapshot.val();
    //   data['book_det'] = bookDet;
    //   let userDb1 = firebase.database().ref("users/"+bookDet.user);
    //   userDb1.once('value').then(function(snapshot1) {
    //     data['user_det'] = snapshot1.val();
    //   });

    //   let userDb2 = firebase.database().ref("users/"+bookDet.trainer);
    //   userDb2.once('value').then(function(snapshot2) {
    //     data['tra_det'] = snapshot2.val();
    //   });
      
    //   return data;
    // });

  }
  

} 