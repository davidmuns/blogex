
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';

import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { SignupComponent } from './components/Auth/signup/signup.component';
import { EmailPasswordComponent } from './components/Auth/email-password/email-password.component';


import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';

import { ArticleService } from './shared/services/article.service';
import { ArticleComponent } from './components/article/article.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    EmailPasswordComponent,
    ResetPasswordComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
