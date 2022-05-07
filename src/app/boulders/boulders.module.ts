import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BouldersRoutingModule } from './boulders-routing.module';
import { BouldersFilterPipe } from './pipes/boulders-filter.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, BouldersRoutingModule],
  exports: [],
})
export class BouldersModule {}
