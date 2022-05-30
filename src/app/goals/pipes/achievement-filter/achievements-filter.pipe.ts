import { Pipe, PipeTransform } from '@angular/core';
import { Achievement } from 'src/app/boulders/interfaces/boulder';

@Pipe({
  name: 'achievementsFilter',
})
export class AchievementsFilterPipe implements PipeTransform {
  transform(
    achievements: Achievement[],
    filterBy: string,
    type: string
  ): Achievement[] {
    if (type === 'day') {
      return achievements.filter(
        (achievement) => achievement.date === filterBy
      );
    } else {
      return achievements.filter(
        (achievement) => achievement.boulder.grade === filterBy
      );
    }
  }
}
