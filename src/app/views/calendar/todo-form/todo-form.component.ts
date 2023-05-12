import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApointmentService } from 'src/app/services/apointment.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  title = new FormControl('');
  startDate = new FormControl(new Date());

  create() {
    ApointmentService.add({
      title: this.title.value as string,
      start: this.startDate.value as Date
    })
  }
}
