import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Helpers } from "../../../helpers/helpers";
import { SnotifyComponent } from "../../../helpers/snotify.component";
import * as firebase from 'firebase';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public bookingId:any;
  public bookingDetails:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userservice :BookingService,
    private router: Router,
    private snotify: SnotifyComponent
  ) {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.bookingId = params['uid'];
      if(this.bookingId == ''){
        this.router.navigateByUrl('admin/booking');
      } else {
        this.getBookingDetails();
        // this.userservice.getBookingDetails(this.bookingId).then(res => {
        //   console.log(res.val());
        // });
      }
    });
   }

  ngOnInit() {
  }

  getBookingDetails(){
    let data:any = {};
    let userDb = firebase.database().ref("bookings/"+this.bookingId);

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
        this.bookingDetails = data;
       
    });
  }
}
