import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { RoleGuardService } from '../../role-guard.service';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
const storyRoute: Routes = [
    {
        path: '',
        canActivate: [RoleGuardService],
        data: {
            title: "Category List",
            expectedRole: 'A',
        },
        children: [{
            path: '',
            data: {
              title: "Category List"
            },
            component: CategoryComponent
        }
        ]
    },
    {
        path: 'add',
        canActivate: [RoleGuardService],
        data: {
            title: "Add Category",
            expectedRole: 'A',
        },
        children: [{
            path: '',
            data: {
              title: "Add Category"
            },
            component: AddComponent
        }
        ]
    },
    {
        path: 'edit/:sid',
        canActivate: [RoleGuardService],
        data: {
            title: "Edit Category",
            expectedRole: 'A',
        },
        children: [{
            path: '',
            data: {
              title: "Edit Category"
            },
            component: EditComponent
        }
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(storyRoute)],
  exports: [RouterModule]
})
export class CategoryRouting { }
