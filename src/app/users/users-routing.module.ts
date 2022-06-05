import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerResolver } from './resolvers/timer.resolver';
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
    path: 'timer',
    loadChildren: () =>
      import('./timer/timer.module').then((m) => m.TimerModule),
    resolve: {
      timer: TimerResolver,
    },
  },
  {
    path: 'pull-ups',
    loadChildren: () =>
      import('./pull-ups/pull-ups.module').then((m) => m.PullUpsPageModule),
  },
  {
    path: 'goal',
    loadChildren: () =>
      import('./goal/goal.module').then((m) => m.GoalPageModule),
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
