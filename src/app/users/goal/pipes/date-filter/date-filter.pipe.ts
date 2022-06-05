import { Pipe, PipeTransform } from '@angular/core';
import { Achievement } from 'src/app/boulders/interfaces/boulder';

@Pipe({
  name: 'dateFilter',
})
export class DateFilterPipe implements PipeTransform {
  transform(date: string): string {
    const day = new Date(date);
    let weekday = day.toLocaleString('default', {
      weekday: 'long',
    });
    weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    const numberDay = day.getDate();
    const month = day.toLocaleString('default', {
      month: 'long',
    });

    return `${weekday}, ${numberDay} de ${month}`;
  }
}
