import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PullUpsPage } from './pull-ups.page';

const routes: Routes = [
  {
    path: '',
    component: PullUpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PullUpsPageRoutingModule {}
