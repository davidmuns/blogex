import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Article } from '../models/article';

@Component({
  selector: 'app-sort-selector',
  templateUrl: './sort-selector.component.html',
  styleUrls: ['./sort-selector.component.scss']
})
export class SortSelectorComponent implements OnInit {

  @Output() selectedOption = new EventEmitter<string>();
  option = '';
  sortOptions = [
    { value: 'title-az', text: this.translateSvc.instant('user-blog.title-az') },
    { value: 'title-za', text: this.translateSvc.instant('user-blog.title-za') },
    { value: 'older', text: this.translateSvc.instant('user-blog.older') },
    { value: 'newer', text: this.translateSvc.instant('user-blog.newer') },
  ];

  constructor( private readonly translateSvc: TranslateService) { }

  ngOnInit(): void {}

  onSortBy(){
    this.selectedOption.emit(this.option);
  }

}
