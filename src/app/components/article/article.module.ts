import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleGalleryComponent } from './article-gallery/articleGallery.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { InternationalitazionModule } from 'src/app/internationalitazion.module';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';



@NgModule({
  declarations: [ArticleComponent, ArticleGalleryComponent],
  imports: [
    CommonModule,
    PipesModule,
    InternationalitazionModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    NgxYoutubePlayerModule.forRoot(),
  ]
})
export class ArticleModule { }
