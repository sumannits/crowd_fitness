import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsComponent } from './bookings.component';
import { BookingsRouting } from './bookings-routing';
import { BookingService } from './booking.service';
import { ShareModuleModule } from '../../share-layout/share-module.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule ,MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFileUploadModule } from '@webacad/ng-mat-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnotifyComponent } from '../../helpers/snotify.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    BookingsRouting,
    ShareModuleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSortModule,
    RouterModule
  ],
  declarations: [BookingsComponent, ViewComponent],
  providers:[BookingService,SnotifyComponent,
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: '1'}
  ]
})
export class BookingsModule { }
