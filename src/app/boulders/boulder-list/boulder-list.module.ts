import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderListPageRoutingModule } from './boulder-list-routing.module';

import { BoulderListPage } from './boulder-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderListPageRoutingModule
  ],
  declarations: [BoulderListPage]
})
export class BoulderListPageModule {}
