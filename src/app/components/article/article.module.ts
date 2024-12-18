import { CarouselComponent } from './caorusel/carousel.component';
import { ArticleGalleryComponent } from './article-gallery/articleGallery.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleGalleryComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    NgxYoutubePlayerModule.forRoot(),
  ],
  exports: [
    ArticleComponent,
    ArticleGalleryComponent,
    CarouselComponent
  ]

})
export class ArticleModule { }
