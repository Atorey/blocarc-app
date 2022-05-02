import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinMaxNumberDirective } from './min-max-number/min-max-number.directive';
import { MatchDirective } from './match/match.directive';



@NgModule({
  declarations: [
    MinMaxNumberDirective,
    MatchDirective
  ],
  exports: [
    MinMaxNumberDirective,
    MatchDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ValidatorsModule { }
