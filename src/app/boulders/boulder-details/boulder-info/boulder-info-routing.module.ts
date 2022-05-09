import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoulderInfoPage } from './boulder-info.page';

const routes: Routes = [
  {
    path: '',
    component: BoulderInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoulderInfoPageRoutingModule {}
