import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoulderViewPage } from './boulder-view.page';

const routes: Routes = [
  {
    path: '',
    component: BoulderViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoulderViewPageRoutingModule {}
