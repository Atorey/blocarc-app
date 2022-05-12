import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderInfoPageRoutingModule } from './boulder-info-routing.module';

import { BoulderInfoPage } from './boulder-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderInfoPageRoutingModule
  ],
  declarations: [BoulderInfoPage]
})
export class BoulderInfoPageModule {}