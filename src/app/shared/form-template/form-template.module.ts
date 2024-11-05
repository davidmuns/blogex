import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTemplateComponent } from './form-template.component';
import { InternationalitazionModule } from 'src/app/internationalitazion.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [FormTemplateComponent],
  imports: [CommonModule, InternationalitazionModule, ReactiveFormsModule,MaterialModule],
  exports: [FormTemplateComponent]
})
export class FormTemplateModule { }
