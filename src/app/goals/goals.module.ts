import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalsPageRoutingModule } from './goals-routing.module';

import { GoalsPage } from './goals.page';
import { AchievementsFilterPipe } from './pipes/achievement-filter/achievements-filter.pipe';
import { DateFilterPipe } from './pipes/date-filter/date-filter.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GoalsPageRoutingModule],
  declarations: [GoalsPage, AchievementsFilterPipe, DateFilterPipe],
})
export class GoalsPageModule {}
