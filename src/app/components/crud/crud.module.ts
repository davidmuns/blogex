import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { EditModule } from './posts/edit/edit.module';
import { NewModule } from './posts/new/new.module';
import { MaterialModule } from 'src/app/material.module';
import { NewComponent } from './posts/new/new.component';
import { EditComponent } from './posts/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Youtube
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { GalleryImagesComponent } from './list-images/gallery-images/gallery-images.component';

// TinyMCE doc: https://www.tiny.cloud/docs/tinymce/6/angular-pm/
// youtube tutorial: https://www.youtube.com/watch?v=YqEDASVUEPc&list=PLSVW22jAG8pCwwM3tjSMfwBKYIS6_fP-F&index=1
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    CrudComponent,
    ListPostsComponent,
    NewComponent,
    EditComponent,
    DeleteComponent,
    GalleryImagesComponent
  ],
  imports: [
    EditorModule,
    NgxYoutubePlayerModule.forRoot(),
    CommonModule,
    CrudRoutingModule,
    EditModule,
    NewModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class CrudModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
