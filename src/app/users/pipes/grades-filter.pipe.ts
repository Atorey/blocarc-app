import { Pipe, PipeTransform } from '@angular/core';
import { Boulder } from 'src/app/boulders/interfaces/boulder';

@Pipe({
  name: 'gradesFilter',
})
export class GradesFilterPipe implements PipeTransform {
  transform(boulders: Boulder[], filters: number[]): Boulder[] {
    return boulders.filter((boulder) =>
      filters.includes(+boulder.grade.slice(0, 1))
    );
  }
}
