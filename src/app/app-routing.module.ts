import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from './guards/login-activate.guard';
import { LogoutActivateGuard } from './guards/logout-activate.guard';
import { TimerResolver } from './timer/resolvers/timer.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
    canActivate: [LogoutActivateGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginActivateGuard],
  },
  {
    path: 'boulders',
    loadChildren: () =>
      import('./boulders/boulders.module').then((m) => m.BouldersModule),
    canActivate: [LoginActivateGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LogoutActivateGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [LoginActivateGuard],
  },
  {
    path: 'timer',
    loadChildren: () =>
      import('./timer/timer.module').then((m) => m.TimerModule),
    canActivate: [LoginActivateGuard],
    resolve: {
      timer: TimerResolver,
    },
  },
  {
    path: 'pull-ups',
    loadChildren: () =>
      import('./pull-ups/pull-ups.module').then((m) => m.PullUpsPageModule),
    canActivate: [LoginActivateGuard],
  },
  {
    path: 'goals',
    loadChildren: () =>
      import('./goals/goals.module').then((m) => m.GoalsPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
