import { CaptionComponent } from './shared/caption/caption.component';
import { ListVideosComponent } from './components/crud/list-videos/list-videos.component';
import { SwitchLanguageComponent } from './shared/switch-language/switch-language.component';
import { AddImageComponent } from './components/crud/posts/add-image/add-image.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ArticleGalleryComponent } from './components/article/article-gallery/articleGallery.component';


import { interceptorProvider } from './interceptors/article-interceptor.service';
import { FrontArticlesComponent } from './components/home/front-articles/front-articles.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserArticlesComponent } from './components/user-articles/user-articles.component';
import { PaginatePipe } from './shared/pipes/paginate.pipe';
import { AboutComponent } from './components/home/about/about.component';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// MATERIAL
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ListImagesComponent } from './components/crud/list-images/list-images.component';
import { SearchPipe } from './shared/pipes/search.pipe';

// Youtube
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { GalleryVideosComponent } from './components/crud/list-videos/gallery-videos/gallery-videos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SwitchLanguageComponent,
    EmailPasswordComponent,
    ResetPasswordComponent,
    SearchComponent,
    MapComponent,
    ArticleComponent,
    ListImagesComponent,
    AddImageComponent,
    FrontArticlesComponent,
    FooterComponent,
    UserArticlesComponent,
    ArticleGalleryComponent,
    CaptionComponent,
    PaginatePipe,
    SearchPipe,
    AboutComponent,
    ListVideosComponent,
    GalleryVideosComponent
  ],
  imports: [
    NgxYoutubePlayerModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CrudModule,
    ToastrModule.forRoot(), // ToastrModule added
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
