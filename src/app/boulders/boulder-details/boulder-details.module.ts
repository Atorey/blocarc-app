import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderDetailsPageRoutingModule } from './boulder-details-routing.module';

import { BoulderDetailsPage } from './boulder-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderDetailsPageRoutingModule
  ],
  declarations: [BoulderDetailsPage]
})
export class BoulderDetailsPageModule {}
