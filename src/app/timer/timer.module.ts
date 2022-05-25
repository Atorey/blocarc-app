import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerRoutingModule } from './timer-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TimerPage } from './timer.page';


@NgModule({
  declarations: [TimerPage],
  imports: [CommonModule, TimerRoutingModule],
  exports: [],
})
export class TimerModule {}
