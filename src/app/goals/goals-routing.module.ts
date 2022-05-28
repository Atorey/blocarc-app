import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalsPage } from './goals.page';

const routes: Routes = [
  {
    path: '',
    component: GoalsPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create-goal/create-goal.module').then( m => m.CreateGoalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsPageRoutingModule {}
