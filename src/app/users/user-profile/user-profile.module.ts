import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import { StaticRatingModule } from 'src/app/components/static-star-rating/static-star-rating.module';
import { GradesFilterPipe } from '../pipes/grades-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    StaticRatingModule,
  ],
  declarations: [UserProfilePage, GradesFilterPipe],
  exports: [GradesFilterPipe],
})
export class UserProfilePageModule {}