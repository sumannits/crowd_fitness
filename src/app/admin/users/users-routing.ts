import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users.component";
import { RoleGuardService } from '../../role-guard.service';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
const usersRoute: Routes = [
    {
        path: '',
        canActivate: [RoleGuardService],
        data: {
            title: "Users List",
            expectedRole: 'A',
        },
        children: [{
            path: '',
            data: {
              title: "Users List"
            },
            component: UsersComponent
        }
        ]
    },
    {
        path: 'add',
        canActivate: [RoleGuardService],
        data: {
            title: "Add User",
            expectedRole: 'A',
        },
        children: [{
            path: '',
            data: {
              title: "Add User"
            },
            component: AddComponent
        }
        ]
    },
    {
        path: 'edit/:uid',
        canActivate: [RoleGuardService],
        data: {
            title: "Edit User",
            expectedRole: 'A',
        },
        children: [{
            path: '',
            data: {
              title: "Edit User"
            },
            component: EditComponent
        }
        ]
    },
];
@NgModule({
  imports: [RouterModule.forChild(usersRoute)],
  exports: [RouterModule],

})
export class UsersRouting { }
