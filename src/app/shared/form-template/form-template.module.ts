import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTemplateComponent } from './form-template.component';
import { InternationalitazionModule } from 'src/app/internationalitazion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SortSelectorComponent } from '../sort-selector/sort-selector.component';

@NgModule({
  declarations: [FormTemplateComponent, SortSelectorComponent],
  imports: [CommonModule, InternationalitazionModule, ReactiveFormsModule, MaterialModule, FormsModule],
  exports: [FormTemplateComponent, SortSelectorComponent]
})
export class FormTemplateModule { }
