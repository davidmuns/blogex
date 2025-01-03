// Components
import { EmailPasswordComponent } from './email-password/email-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthComponent } from './auth.component';

// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    EmailPasswordComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
]
})
export class AuthModule { }
