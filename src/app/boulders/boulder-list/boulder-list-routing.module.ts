import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoulderListPage } from './boulder-list.page';

const routes: Routes = [
  {
    path: '',
    component: BoulderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoulderListPageRoutingModule {}
