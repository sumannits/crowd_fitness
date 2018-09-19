import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingsComponent } from "./bookings.component";
import { RoleGuardService } from '../../role-guard.service';
import { ViewComponent } from './view/view.component';
const bookRoute: Routes = [
    {
        path: '',
        canActivate: [RoleGuardService],
        data: {
            title: "Booking List",
            expectedRole: 'A',
        },
        children: [{
            path: '',
            data: {
              title: "Booking List"
            },
            component: BookingsComponent
        }
        ]
    },
    {
        path: 'view/:uid',
        canActivate: [RoleGuardService],
        data: {
            title: "View Booking",
            expectedRole: 'A',
        },
        children: [{
            path: '',
            data: {
              title: "View Booking"
            },
            component: ViewComponent
        }
        ]
    },
];
@NgModule({
  imports: [RouterModule.forChild(bookRoute)],
  exports: [RouterModule],

})
export class BookingsRouting { }
