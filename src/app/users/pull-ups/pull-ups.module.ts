import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PullUpsPageRoutingModule } from './pull-ups-routing.module';

import { PullUpsPage } from './pull-ups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PullUpsPageRoutingModule
  ],
  declarations: [PullUpsPage]
})
export class PullUpsPageModule {}
