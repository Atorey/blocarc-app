import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderCreationPageRoutingModule } from './boulder-creation-routing.module';

import { BoulderCreationPage } from './boulder-creation.page';
import { ModalCreateWallComponent } from './modal-create-wall/modal-create-wall.component';
import { ValidatorsModule } from 'src/app/validators/validators.module';
import { ModalSelectWallComponent } from './modal-select-wall/modal-select-wall.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalCreateBoulderComponent } from './modal-create-boulder/modal-create-boulder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderCreationPageRoutingModule,
    ValidatorsModule,
    ImageCropperModule
  ],
  declarations: [
    BoulderCreationPage,
    ModalCreateWallComponent,
    ModalSelectWallComponent,
    ModalCreateBoulderComponent
  ]
})
export class BoulderCreationPageModule {}
