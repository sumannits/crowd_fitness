import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRouting } from "./admin-routing";
import { AdminComponent } from './admin.component';
import { ScriptLoaderService } from "../services/script-loader.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrontendLayoutComponent } from '../layouts';
import { ShareModuleModule } from '../share-layout/share-module.module';
import { CategoryService } from './category/category-service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
const APP_CONTAINERS = [
  FrontendLayoutComponent
];
// Import share layouts
import { AdminAppFooterComponent,AdminAppHeaderComponent } from '../share-layout';
const APP_COMPONENTS = [
  AdminAppFooterComponent,
  AdminAppHeaderComponent
];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
  ],
  imports: [
    AdminRouting,
    CommonModule,
    FormsModule,
    ShareModuleModule,
    SnotifyModule,
    //NoopAnimationsModule
  ],
  providers: [
    ScriptLoaderService,
    CategoryService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyModule,
    SnotifyService
  ],
})

export class AdminModule { }
