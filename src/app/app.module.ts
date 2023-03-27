// Shared components
import { CaptionComponent } from './shared/caption/caption.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

// Home components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/home/about/about.component';
import { FrontArticlesComponent } from './components/home/front-articles/front-articles.component';

// CRUD components
import { AddImageComponent } from './components/crud/posts/add-image/add-image.component';

// Auth components
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

// Other components
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleGalleryComponent } from './components/article/article-gallery/articleGallery.component';
import { UserBlogComponent } from './components/user-blog/user-blog.component';
import { SearchComponent } from './components/search/search.component';
import { InfoAppComponent } from './components/info-app/info-app.component';
import { ArtcileCardsComponent } from './components/crud/article-cards/article-cards.component';
import { GalleryVideosComponent } from './components/crud/article-cards/gallery-videos/gallery-videos.component';

// Modules
import { CrudModule } from './components/crud/crud.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AuthModule } from './components/auth/auth.module';

// Interceptors
import { interceptorProvider } from './interceptors/token-interceptor.service';

// Pipes
import { SearchPipe } from './shared/pipes/search.pipe';
import { PaginatePipe } from './shared/pipes/paginate.pipe';
import { SafeHtmlPipe } from './shared/pipes/safehtml.pipe';

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

@NgModule({
  declarations: [
    AddImageComponent,
    ResetPasswordComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    ArticleComponent,
    ArtcileCardsComponent,
    FrontArticlesComponent,
    FooterComponent,
    UserBlogComponent,
    ArticleGalleryComponent,
    CaptionComponent,
    PaginatePipe,
    SearchPipe,
    SafeHtmlPipe,
    AboutComponent,
    GalleryVideosComponent,
    InfoAppComponent
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
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

