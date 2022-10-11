import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';


import { CrudModule } from './components/crud/crud.module';

import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { SignupComponent } from './components/Auth/signup/signup.component';
import { SearchComponent } from './components/search/search.component';



import { EmailPasswordComponent } from './components/Auth/email-password/email-password.component';


import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';
import { MapComponent } from './components/map/map.component';
import { ArticleComponent } from './components/article/article.component';


import { interceptorProvider } from './interceptors/article-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    EmailPasswordComponent,
    ResetPasswordComponent,
    SearchComponent,
    MapComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CrudModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
