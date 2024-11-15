// Components
import { EmailPasswordComponent } from './email-password/email-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthComponent } from './auth.component';

// Modules
import { InternationalitazionModule } from './../../internationalitazion.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    EmailPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    InternationalitazionModule,
    SharedModule
]
})
export class AuthModule { }
