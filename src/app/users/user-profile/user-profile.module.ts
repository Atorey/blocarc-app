import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import { StaticRatingModule } from 'src/app/components/static-star-rating/static-star-rating.module';
import { GradesFilterPipe } from '../pipes/grades-filter.pipe';
import { ModalGoalComponent } from './modal-goal/modal-goal.component';
import { ModalEditProfileComponent } from './modal-edit-profile/modal-edit-profile.component';
import { ValidatorsModule } from 'src/app/validators/validators.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    StaticRatingModule,
    ValidatorsModule,
  ],
  declarations: [
    UserProfilePage,
    GradesFilterPipe,
    ModalGoalComponent,
    ModalEditProfileComponent,
  ],
  exports: [GradesFilterPipe, ModalGoalComponent, ModalEditProfileComponent],
})
export class UserProfilePageModule {}
