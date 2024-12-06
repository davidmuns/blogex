import { SearchPipe } from './search.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatePipe } from './paginate.pipe';
import { FormatDatePipe } from './formatdate.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';




@NgModule({
  declarations: [PaginatePipe, SearchPipe, FormatDatePipe, SafeHtmlPipe],
  imports: [
    CommonModule
  ],
  exports: [PaginatePipe, SearchPipe, FormatDatePipe, SafeHtmlPipe]
})
export class PipesModule { }
