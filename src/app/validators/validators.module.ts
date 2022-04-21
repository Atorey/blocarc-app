import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinMaxNumberDirective } from './min-max-number/min-max-number.directive';



@NgModule({
  declarations: [
    MinMaxNumberDirective
  ],
  exports: [
    MinMaxNumberDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ValidatorsModule { }
