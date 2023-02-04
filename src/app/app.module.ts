import { SafeHtmlPipe } from './shared/pipes/safehtml.pipe';
// Shared components
import { CaptionComponent } from './shared/caption/caption.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

// Auth components
import { LoginComponent } from './components/Auth/login/login.component';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';
import { EmailPasswordComponent } from './components/Auth/email-password/email-password.component';

// Home components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/home/about/about.component';
import { FrontArticlesComponent } from './components/home/front-articles/front-articles.component';

// CRUD components
import { ListImagesComponent } from './components/crud/list-images/list-images.component';
import { ListVideosComponent } from './components/crud/list-videos/list-videos.component';
import { GalleryVideosComponent } from './components/crud/list-videos/gallery-videos/gallery-videos.component';
import { AddImageComponent } from './components/crud/posts/add-image/add-image.component';

// Other components
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleGalleryComponent } from './components/article/article-gallery/articleGallery.component';
import { UserBlogComponent } from './components/user-blog/user-blog.component';
import { SearchComponent } from './components/search/search.component';

// Modules
import { CrudModule } from './components/crud/crud.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

// Interceptors
import { interceptorProvider } from './interceptors/token-interceptor.service';

// Pipes
import { SearchPipe } from './shared/pipes/search.pipe';
import { PaginatePipe } from './shared/pipes/paginate.pipe';

// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ####### EXTERNAL LIBRARIES ######

// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// MATERIAL
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Youtube
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

// Toastr
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    EmailPasswordComponent,
    ResetPasswordComponent,
    SearchComponent,
    MapComponent,
    ArticleComponent,
    ListImagesComponent,
    AddImageComponent,
    FrontArticlesComponent,
    FooterComponent,
    UserBlogComponent,
    ArticleGalleryComponent,
    CaptionComponent,
    PaginatePipe,
    SearchPipe,
    SafeHtmlPipe,
    AboutComponent,
    ListVideosComponent,
    GalleryVideosComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
