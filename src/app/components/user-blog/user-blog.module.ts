import { InternationalitazionModule } from './../../internationalitazion.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { UserBlogComponent } from './user-blog.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [UserBlogComponent],
  imports: [
    PipesModule,
    FormsModule,
    RouterModule,
    InternationalitazionModule,
    MaterialModule,
    SharedModule
  ]
})
export class UserBlogModule { }
