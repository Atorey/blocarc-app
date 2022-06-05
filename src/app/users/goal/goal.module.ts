import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AchievementsFilterPipe } from './pipes/achievement-filter/achievements-filter.pipe';
import { DateFilterPipe } from './pipes/date-filter/date-filter.pipe';
import { GoalPageRoutingModule } from './goal-routing.module';
import { GoalPage } from './goal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GoalPageRoutingModule],
  declarations: [GoalPage, AchievementsFilterPipe, DateFilterPipe],
})
export class GoalPageModule {}
