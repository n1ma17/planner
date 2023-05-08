import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IApointment {
  id: string;
  title: string;
  start: Date;
}
export function getUniqueId(): string {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

@Injectable({
  providedIn: 'root',
})
export class ApointmentService {
  private static dataSource =
    new BehaviorSubject<IApointment[]>([
      {
        id: getUniqueId(),
        start: new Date('Thu May 04 2023 11:05:00'),
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar.'
      },
      {
        id: getUniqueId(),
        start: new Date('Thu May 06 2023 13:30:00'),
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar.'
      },
      {
        id: getUniqueId(),
        start: new Date('Thu May 05 2023 14:45:00'),
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar.'
      },
      {
        id: getUniqueId(),
        start: new Date('Thu May 07 2023 07:00:00'),
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar.'
      }
    ]);
  static appointments: Observable<IApointment[]> =
    ApointmentService.dataSource.asObservable();
  constructor() {}

  static add(item: Omit<IApointment, 'id'>) {
    const id = getUniqueId();
    const newArr = [...this.dataSource.value, { id, ...item }]
    this.dataSource.next(newArr);
  }

  static remove(id: string) {
    const newArr = [...this.dataSource.value.filter((i) => i.id !== id)];
    this.dataSource.next(newArr);
  }

  static update(item: IApointment) {
    
    const newArr = [
      ...this.dataSource.value.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      }),
    ];
    this.dataSource.next(newArr);
  }
}
