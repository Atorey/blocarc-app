import { Pipe, PipeTransform } from '@angular/core';
import { Boulder } from '../interfaces/boulder';

@Pipe({
  name: 'bouldersFilter',
})
export class BouldersFilterPipe implements PipeTransform {
  transform(boulders: Boulder[], filterBy: string): Boulder[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filter
      ? boulders.filter(
          (boulder) =>
            boulder.name.toLowerCase().includes(filter) ||
            boulder.creator.username.toLowerCase().includes(filter)
        )
      : boulders;
  }
}
