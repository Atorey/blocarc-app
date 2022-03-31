import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderCreationPageRoutingModule } from './boulder-creation-routing.module';

import { BoulderCreationPage } from './boulder-creation.page';
import { ModalWallComponent } from './modal-wall/modal-wall.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderCreationPageRoutingModule,
  ],
  declarations: [BoulderCreationPage, ModalWallComponent]
})
export class BoulderCreationPageModule {}
