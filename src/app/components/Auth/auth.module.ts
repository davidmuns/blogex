// Components
import { EmailPasswordComponent } from './email-password/email-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthComponent } from './auth.component';

// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    EmailPasswordComponent
  ],
  imports: [
    SharedModule
]
})
export class AuthModule { }
