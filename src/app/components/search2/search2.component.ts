import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.scss']
})
export class Search2Component implements OnInit {
  articles: Article[] = [];
  filterOptions!: Observable<string[]>;
  formControl = new FormControl('');

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router, 
    private readonly articleSvc: ArticleService) {}

  ngOnInit() {
    this.getArticles();
    this.filterOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )
  }

  private getArticles() {
    this.articleSvc.getAll().subscribe({
      next: data => {
        this.articles = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private _filter(value: string): string[]{
    const searchValue = value.toLowerCase();
    return this.articles.map(article => article.title).filter(title => title.toLowerCase().includes(searchValue));
  }

  clearInput(): void {
    this.formControl.setValue('');  // O también puedes usar this.myControl.setValue('') para borrar el contenido.

  }

  selectArticle(value: string) {
    for (const option of this.articles) {
      if (option.title === value) {
        this.router.navigate(['article', option.id]);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        break;
      }
    }
  }
}
