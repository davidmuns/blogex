import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternationalitazionModule } from '../internationalitazion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FormTemplateComponent } from './form-template/form-template.component';
import { SortSelectorComponent } from './sort-selector/sort-selector.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    FormTemplateComponent,
    SortSelectorComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    InternationalitazionModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    FormTemplateComponent,
    SortSelectorComponent,
    FooterComponent
  ]
})
export class SharedModule { }
