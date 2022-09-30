import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { EditModule } from './posts/edit/edit.module';
import { NewModule } from './posts/new/new.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    CrudComponent,
    ListPostsComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    EditModule,
    NewModule,
    MaterialModule
  ]
})
export class CrudModule { }
