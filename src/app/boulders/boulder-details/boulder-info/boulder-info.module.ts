import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { IonicModule } from '@ionic/angular';

import { BoulderInfoPageRoutingModule } from './boulder-info-routing.module';

import { BoulderInfoPage } from './boulder-info.page';
import { StaticRatingModule } from 'src/app/components/static-star-rating/static-star-rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderInfoPageRoutingModule,
    StaticRatingModule,
  ],
  declarations: [BoulderInfoPage, Chart],
  exports: [Chart],
})
export class BoulderInfoPageModule {}
