import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { NgModule } from '@angular/core';
import { AppRouting } from "./app.routing";
import { AppComponent } from './app.component';
//import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { AppAuthGuard } from './app-auth.guard';
import { AppAuthService } from './app-auth.service';
import { RoleGuardService } from './role-guard.service';
import { ScriptLoaderService } from "./services/script-loader.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule }   from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import * as firebase from 'firebase';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


const config = {
  apiKey: 'AIzaSyCOYRCwjG6Jc9DUPQSDB0eTBF809go_Byc',
  authDomain: 'mahib-dda5b.firebaseapp.com',
  databaseURL: 'https://mahib-dda5b.firebaseio.com',
  projectId: "mahib-dda5b",
  storageBucket: "mahib-dda5b.appspot.com",
  messagingSenderId: "296707337803"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    //AdminSidebarComponent,
  ],
  imports: [
    AppRouting,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SnotifyModule,
    // Add this import here
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     authScheme: '',
    //     whitelistedDomains: ['localhost:3000'],
    //     blacklistedRoutes: ['localhost:3000/api/signin']
    //   }
    // })
  ],
  exports:[],
  providers: [
    AppAuthGuard,
    AppAuthService,
    RoleGuardService,
    ScriptLoaderService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyModule,
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
