import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendComponent } from './frontend.component';
import { FrontendRoutingModule } from './frontend-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FrontendRoutingModule
  ],
  declarations: [FrontendComponent]
})
export class FrontendModule { }
