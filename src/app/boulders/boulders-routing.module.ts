import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoulderTestPage } from './boulder-test/boulder-test.page';

const routes: Routes = [{
  path: '',
  component: BoulderTestPage
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BouldersRoutingModule { }
