import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderTestPageRoutingModule } from './boulder-test-routing.module';

import { BoulderTestPage } from './boulder-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderTestPageRoutingModule
  ],
  declarations: [BoulderTestPage]
})
export class BoulderTestPageModule {}
