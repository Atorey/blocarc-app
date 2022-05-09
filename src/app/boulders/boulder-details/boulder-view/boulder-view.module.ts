import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderViewPageRoutingModule } from './boulder-view-routing.module';

import { BoulderViewPage } from './boulder-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderViewPageRoutingModule
  ],
  declarations: [BoulderViewPage]
})
export class BoulderViewPageModule {}
