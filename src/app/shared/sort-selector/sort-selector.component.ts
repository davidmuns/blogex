import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sort-selector',
  templateUrl: './sort-selector.component.html',
  styleUrls: ['./sort-selector.component.scss']
})
export class SortSelectorComponent implements OnInit {

  sortBy = '';
  orderOptions = [
    { value: 'title-az', viewValue: this.translateSvc.instant('user-blog.title-az') },
    { value: 'title-za', viewValue: this.translateSvc.instant('user-blog.title-za') },
    { value: 'older', viewValue: this.translateSvc.instant('user-blog.older') },
    { value: 'newer', viewValue: this.translateSvc.instant('user-blog.newer') },
  ];

  constructor( private readonly translateSvc: TranslateService) { }

  ngOnInit(): void {
  }

}
