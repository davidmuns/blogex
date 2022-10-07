import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { EditTempComponent } from './posts/edit-temp/edit-temp.component';


@NgModule({
  declarations: [
    CrudComponent,
    ListPostsComponent,
    NewComponent,
    EditComponent,
    DeleteComponent,
    EditTempComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    EditModule,
    NewModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CrudModule { }
