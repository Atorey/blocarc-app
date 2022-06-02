import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { ValidatorsModule } from 'src/app/validators/validators.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatorsModule,
    RegisterPageRoutingModule,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
