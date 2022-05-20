import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
  {
    path: 'me',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
    pathMatch: 'full',
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
    pathMatch: 'full',
    resolve: {
      user: UserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
