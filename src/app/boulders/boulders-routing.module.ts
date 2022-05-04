import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    loadChildren: () =>
      import('./boulder-creation/boulder-creation.module').then(
        (m) => m.BoulderCreationPageModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'explore',
    loadChildren: () =>
      import('./boulder-list/boulder-list.module').then(
        (m) => m.BoulderListPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BouldersRoutingModule {}
