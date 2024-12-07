// Shared components
import { CaptionComponent } from './shared/caption/caption.component';
import { HeaderComponent } from './shared/header/header.component';

// CRUD components
import { AddImageComponent } from './components/crud/posts/add-image/add-image.component';

// Auth components
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

// Other components
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { InfoAppComponent } from './components/info-app/info-app.component';
import { GalleryVideosComponent } from './components/crud/article-cards/gallery-videos/gallery-videos.component';

// Modules
import { CrudModule } from './components/crud/crud.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './shared/shared.module';

// Interceptors
import { interceptorProvider } from './interceptors/token-interceptor.service';


// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ####### EXTERNAL LIBRARIES ######

// MATERIAL
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Youtube
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

// Toastr
import { ToastrModule } from 'ngx-toastr';

// Internationalitation
import { InternationalitazionModule } from './internationalitazion.module';
import { HomeModule } from './components/home/home.module';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { GroupFormRoutingModule } from './components/crud/posts/group-form/group-form-routing.module';
import { UserBlogComponent } from './components/user-blog/user-blog.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleGalleryComponent } from './components/article/article-gallery/articleGallery.component';

@NgModule({
  declarations: [
    AddImageComponent,
    ResetPasswordComponent,
    AppComponent,
    HeaderComponent,
    SearchComponent,
    CaptionComponent,
    GalleryVideosComponent,
    InfoAppComponent,
    MyAccountComponent,
    UserBlogComponent,
    ArticleComponent,
    ArticleGalleryComponent
  ],
  imports: [
    InternationalitazionModule,
    AuthModule,
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
    SharedModule,
    HomeModule,
    GroupFormRoutingModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

