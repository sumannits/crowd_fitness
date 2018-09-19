import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [AdminSidebarComponent],
  exports: [
    AdminSidebarComponent
  ]
})
export class ShareModuleModule { }
