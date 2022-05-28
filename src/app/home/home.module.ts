import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgCircleProgressModule.forRoot({
    }),
  ],
})
export class HomeModule {}
