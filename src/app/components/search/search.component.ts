import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Article } from 'src/app/shared/models/article';
import { NavigationExtras, Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  @ViewChild('hideForm') toForm!: ElementRef;

  myControl = this.fb.control('', [Validators.minLength(1), Validators.required]);
  options: string[] = [];
  allOptions: Article[] = [];
  filteredOptions!: Observable<string[]>;
  oneArticle!: any;
  articlesTitle!: string[];
  articleId!: number;
  mostrar: boolean = false;
  private debounceTimer!: any;
  private uniqueChars: string[] = [];

  constructor(
    private readonly utilsSvc: UtilsService,
    private readonly articleSvc: ArticleService,
    private readonly router: Router,
    private readonly renderer2: Renderer2,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(400),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

clearInput(): void {
  this.myControl.reset();  // O también puedes usar this.myControl.setValue('') para borrar el contenido.
}


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.myControl.valid) {
      this.articleSvc.getAll()
        .subscribe(res => {
          this.allOptions = this.utilsSvc.sortArticlesByTitleAZ(res);;
          this.options = [];
          this.allOptions.forEach(x => {
            this.options.push(x.title);
          });
          this.uniqueChars = [...new Set(this.options)];
        });
    }
    return this.uniqueChars.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectArticle(value: string) {
    for (const option of this.allOptions) {
      if (option.title === value) {
        this.articleId = option.id;
        this.router.navigate(['article', this.articleId]);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        break;
      }
    }
  }

  submitArticle() {
    for (const option of this.allOptions) {
      if (option.title === this.myControl.value) {
        this.articleId = option.id;
        this.router.navigate(['article', this.articleId]);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
      }
    }
  }

  openSelect() {
    this.mostrar = !this.mostrar;
    const asForm = this.toForm.nativeElement;
    if (this.mostrar) {
      this.renderer2.setStyle(asForm, 'display', 'block');
    } else {
      this.renderer2.setStyle(asForm, 'display', 'none');
    }
  }
}
