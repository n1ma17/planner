import { CdkDragRelease, DragRef } from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoFormComponent } from './todo-form/todo-form.component'; 
import { MatDialog } from '@angular/material/dialog';
import {
  ApointmentService,
  IApointment,
} from 'src/app/services/apointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  apointments!: IApointment[];
  leapYear = new Date(new Date().getFullYear(), 1, 29).getDate() === 29;
  months = [
    { name: 'January', days: 31 },
    { name: 'February', days: this.leapYear ? 29 : 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];
  @ViewChild('appointment') appointmentCard!: ElementRef;
  @ViewChild('dayCard') daysCard!: ElementRef
  @ViewChild('hours') hoursCard!: ElementRef
  controller = new FormControl(this.months[new Date().getMonth()]);

  constructor(public dialog: MatDialog) {
    ApointmentService.appointments.subscribe((value) => {
      this.apointments = value;
    });
    
  }

  getMonthNames() {
    return this.months.map((i) => i.name);
  }

  displayFn(item: (typeof this.months)[number]) {
    return item && item.name ? item.name : '';
  }

  getApointments(dateIndex: number): IApointment[] {
    return this.apointments.filter((i) => {
      const start = Number(
        new Date(
          `${new Date().getFullYear()}-${this.controller.value?.name}-${
            dateIndex + 1
          }`
        )
      );
      const end = Number(
        new Date(
          `${new Date().getFullYear()}-${this.controller.value?.name}-${
            dateIndex + 1
          } 23:59:59`
        )
      );
      const apointmentDate = Number(i.start);
      return start < apointmentDate && end > apointmentDate;
    });
  }
  rowHeight = 60 ;
  apointmentHeight = 20;
  calcTop(apointment: IApointment) {
    const hour = apointment.start.getHours();
    
    const minute = apointment.start.getMinutes();
    console.log({minute});
    const top = ((hour + 1) * this.rowHeight) + ((this.rowHeight * minute) / 60) + this.daysCard?.nativeElement?.clientHeight
    const cardsHeight =  (this.appointmentCard?.nativeElement?.clientHeight + this.hoursCard?.nativeElement?.clientHeight)/2
    console.log({top});
    console.log(this.appointmentCard?.nativeElement?.clientHeight);
    console.log( this.hoursCard?.nativeElement?.clientHeight);
    
    
    console.log({cardsHeight});
    
    return `top: ${(top - cardsHeight)}px`;
  }
  onDraged(e: CdkDragRelease<any>, apointment: IApointment) {
    const {
      source: { element },
    } = e;
    var style = window.getComputedStyle(element.nativeElement);
    let { m41: x, m42: y } = new WebKitCSSMatrix(style.transform);

    apointment.start.setTime(
      apointment.start.getTime() + (y / this.rowHeight) * 60 * 60 * 1000
    );

    if (Math.abs(x) > 150)
      apointment.start.setDate(apointment.start.getDate() + x / 300);

    ApointmentService.update({ ...apointment });

    e.source.reset();
  }
  openDialog() {
    const dialogRef = this.dialog.open(TodoFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  removeApointment(apointment: IApointment) {
    ApointmentService.remove(apointment.id)
  }
}
