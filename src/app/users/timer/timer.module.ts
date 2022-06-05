import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerPage } from './timer.page';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { TimerRoutingModule } from './timer-routing.module';

@NgModule({
  declarations: [TimerPage],
  imports: [CommonModule, TimerRoutingModule],
  exports: [],
  providers: [NativeAudio],
})
export class TimerModule {}
