// Components
import { CrudComponent } from './crud.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { NewComponent } from './posts/new/new.component';
import { EditComponent } from './posts/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';

// Modules
import { InternationalitazionModule } from './../../internationalitazion.module';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud-routing.module';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { EditModule } from './posts/edit/edit.module';
import { NewModule } from './posts/new/new.module';

// Youtube
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

// TinyMCE doc: https://www.tiny.cloud/docs/tinymce/6/angular-pm/
// youtube tutorial: https://www.youtube.com/watch?v=YqEDASVUEPc&list=PLSVW22jAG8pCwwM3tjSMfwBKYIS6_fP-F&index=1
import { EditorModule } from '@tinymce/tinymce-angular';
import { GalleryImagesComponent } from './article-cards/gallery-images/gallery-images.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupFormComponent } from './posts/group-form/group-form.component';

@NgModule({
  declarations: [
    CrudComponent,
    ListPostsComponent,
    NewComponent,
    EditComponent,
    DeleteComponent,
    GalleryImagesComponent,
    GroupFormComponent
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
    InternationalitazionModule,
    SharedModule
]
})
export class CrudModule { }
