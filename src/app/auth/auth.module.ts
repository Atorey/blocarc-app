import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, RouterModule],
})
export class AuthModule {}
