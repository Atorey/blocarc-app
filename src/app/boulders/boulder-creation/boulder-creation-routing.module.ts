import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoulderCreationPage } from './boulder-creation.page';

const routes: Routes = [
  {
    path: '',
    component: BoulderCreationPage,
    pathMatch: 'full',
    children: [
      {
        path: 'image',
      },
      {
        path: 'create',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoulderCreationPageRoutingModule {}
