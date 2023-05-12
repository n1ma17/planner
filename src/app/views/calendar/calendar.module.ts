import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import {DragDropModule} from'@angular/cdk/drag-drop' 
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MatTooltipModule } from "@angular/material/tooltip";
@NgModule({
  declarations: [CalendarComponent, TodoFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarComponent,
      },
    ]),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule
  ],
})
export class CalendarModule {}
