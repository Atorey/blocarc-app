import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { RouterModule } from '@angular/router';
import { LoginPage } from '../auth/login/login.page';
import { AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from '../interceptors/social-login-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    RouterModule,
  ],
  declarations: [WelcomePage],
})
export class WelcomePageModule {}
