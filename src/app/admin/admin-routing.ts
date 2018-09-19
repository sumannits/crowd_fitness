import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FrontendLayoutComponent } from '../layouts';
import { AppAuthGuard } from '../app-auth.guard';
import { RoleGuardService } from '../role-guard.service';

const adminRoute: Routes = [
  {
    path: '',
    data: {
        title: "Admin"
    },
    children: [{
        path: '',
        data: {
          title: "Login Page"
        },
        component: AdminComponent
    }
    ]
  },
  {
    path: 'dashboard',
    component: FrontendLayoutComponent,
    canActivate: [RoleGuardService],
    data: {
        expectedRole: 'A',
        title: "Admin Dashboard"
    },
    children: [{
        path: '',
        data: {
          title: "Dashboard"
        },
        component: DashboardComponent
    }]
  },
  {
    path:'category',
    component: FrontendLayoutComponent,
    canActivate: [RoleGuardService],
    data:{
      expectedRole: 'A',
      title: "Manage Category"
    },
    children: [
      {
        path: '',
        loadChildren: './category/category.module#CategoryModule'
      }
    ]
  },
  {
    path:'booking',
    component: FrontendLayoutComponent,
    canActivate: [RoleGuardService],
    data:{
      expectedRole: 'A',
      title: "Manage Booking"
    },
    children: [
      {
        path: '',
        loadChildren: './bookings/bookings.module#BookingsModule'
      }
    ]
  },
  {
    path:'users',
    component: FrontendLayoutComponent,
    canActivate: [RoleGuardService],
    data:{
      expectedRole: 'A',
      title: "Manage Users"
    },
    children: [
      {
        path: '',
        loadChildren: './users/users.module#UsersModule'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoute)],
  exports: [RouterModule]
})
export class AdminRouting { }
