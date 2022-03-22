import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      /* {
        path: 'about',
        loadChildren: '../about/about.module#AboutPageModule'
      },
      {
        path: 'contact',
        loadChildren: '../contact/contact.module#ContactPageModule'
      }, */
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
