import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerRoutingModule } from './timer-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TimerPage } from './timer.page';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

@NgModule({
  declarations: [TimerPage],
  imports: [CommonModule, TimerRoutingModule],
  exports: [],
  providers: [NativeAudio],
})
export class TimerModule {}
