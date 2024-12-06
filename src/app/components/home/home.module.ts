import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { FrontArticlesComponent } from './front-articles/front-articles.component';
import { InternationalitazionModule } from 'src/app/internationalitazion.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    AboutComponent,
    FrontArticlesComponent,
    MapComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    InternationalitazionModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    PipesModule
  ],
  exports: [
    FrontArticlesComponent,
    AboutComponent
  ]
})
export class HomeModule { }
