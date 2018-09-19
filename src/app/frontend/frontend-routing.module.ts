import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FrontendComponent } from "./frontend.component";
const frontendRoute: Routes = [
  {
    path: '',
    data: {
        title: "Frontend"
    },
    children: [{
        path: '',
        data: {
            title: "Home Page"
        },
        component: FrontendComponent
    }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(frontendRoute)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
