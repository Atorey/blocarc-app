import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderListPageRoutingModule } from './boulder-list-routing.module';

import { BoulderListPage } from './boulder-list.page';
import { BouldersFilterPipe } from '../pipes/boulders-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderListPageRoutingModule,
  ],
  declarations: [BoulderListPage, BouldersFilterPipe],
  exports: [BouldersFilterPipe],
})
export class BoulderListPageModule {}
