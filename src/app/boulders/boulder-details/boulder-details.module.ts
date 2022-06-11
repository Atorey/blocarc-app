import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BoulderDetailsPageRoutingModule } from './boulder-details-routing.module';
import { BoulderDetailsPage } from './boulder-details.page';
import { ModalCompleteBoulderComponent } from './modal-complete-boulder/modal-complete-boulder.component';
import { ValidatorsModule } from 'src/app/validators/validators.module';
import { StarRatingModule } from 'ionic5-star-rating';
import { ModalUpdateBoulderComponent } from './modal-update-boulder/modal-update-boulder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderDetailsPageRoutingModule,
    IonicModule,
    ValidatorsModule,
    ReactiveFormsModule,
    StarRatingModule,
  ],
  declarations: [
    BoulderDetailsPage,
    ModalCompleteBoulderComponent,
    ModalUpdateBoulderComponent,
  ],
})
export class BoulderDetailsPageModule {}
