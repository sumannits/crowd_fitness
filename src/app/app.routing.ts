import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers
import { FrontendLayoutComponent } from './layouts';
const appRoutes: Routes = [
  { 
    path:'',
    data:{
        title: 'Home Page'
    },
    children: [
        {
        path: '',
        //loadChildren: './frontend/frontend.module#FrontendModule'
        loadChildren: './admin/admin.module#AdminModule'
        }
    ]
  },
  {
    path:'frontend',
    data:{
      title: 'Home Page'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/frontend.module#FrontendModule'
      }
    ]
  },
  {
    path:'admin',
    //component: FrontendLayoutComponent,
    data:{
      title: 'Admin'
    },
    children: [
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule'
      }
    ]
  },
  //{ path: '**', redirectTo: '' }
  { path: '**', redirectTo: 'admin' }
];
@NgModule({
  //imports: [ RouterModule.forRoot(appRoutes) ],
  imports: [ RouterModule.forRoot(appRoutes,{useHash: true}) ],
  exports: [ RouterModule ]
})

export class AppRouting { }
