import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoulderDetailsPage } from './boulder-details.page';

const routes: Routes = [
  {
    path: '',
    component: BoulderDetailsPage,
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'view',
        loadChildren: () =>
          import('./boulder-view/boulder-view.module').then(
            (m) => m.BoulderViewPageModule
          ),
      },
      {
        path: 'info',
        loadChildren: () =>
          import('./boulder-info/boulder-info.module').then(
            (m) => m.BoulderInfoPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoulderDetailsPageRoutingModule {}
