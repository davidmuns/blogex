import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = [];
  allOptions: Article[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private readonly articleSvc: ArticleService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    /* this.articleSvc.getAll()
    .subscribe(res => {
      this.allOptions = res;
      this.allOptions.map(x => this.options = x.title);
    });
 */
    
    
  }

  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));

    /* return this.articleSvc.getAll()
    .subscribe(res => {
      res. filter(option => option.toLowerCase().includes(filterValue));
    })  */
  }

}
