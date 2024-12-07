import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternationalitazionModule } from '../internationalitazion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FormTemplateComponent } from './form-template/form-template.component';
import { SortSelectorComponent } from './sort-selector/sort-selector.component';
import { FooterComponent } from './footer/footer.component';
import { PipesModule } from './pipes/pipes.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    FormTemplateComponent,
    SortSelectorComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    InternationalitazionModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PipesModule,
    AppRoutingModule
  ],
  exports: [
    FormTemplateComponent,
    SortSelectorComponent,
    FooterComponent,
    PipesModule,
    CommonModule,
    InternationalitazionModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class SharedModule { }
