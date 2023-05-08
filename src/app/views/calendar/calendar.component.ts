import { CdkDragRelease, DragRef } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
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

  controller = new FormControl(this.months[new Date().getMonth()]);
  title = new FormControl('');
  startDate = new FormControl(new Date());
  constructor() {
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
  rowHeight = 58;
  calcTop(apointment: IApointment) {
    const hour = apointment.start.getHours();

    const minute = apointment.start.getMinutes();

    return `top: ${hour * this.rowHeight + (this.rowHeight * minute) / 60}px`;
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
  create() {
    ApointmentService.add({
      title: this.title.value as string,
      start: this.startDate.value as Date
    })
  }
  removeApointment(apointment: IApointment) {
    ApointmentService.remove(apointment.id)
  }
}
