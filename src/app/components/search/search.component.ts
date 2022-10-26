import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Article } from 'src/app/shared/models/article';
import { NavigationExtras, Router } from '@angular/router';

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

  myControl = new FormControl('');
  options: string[] = [];
  allOptions: Article[] = [];
  filteredOptions!: Observable<string[]>;
  oneArticle!: any;
  articlesTitle!: string[];
  articleId!: number;
  mostrar: boolean = false;

  constructor(private readonly articleSvc: ArticleService, 
    private readonly router: Router,
    private readonly renderer2: Renderer2
    ) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.articleSvc.getAll()
    .subscribe(res => {
      this.allOptions = res;
      this.allOptions.map(x =>{ this.options.push(x.title);
      });
    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectArticle(){
    for(let i = 0; i < this.allOptions.length; i++){
      if(this.allOptions[i].title == this.myControl.value){
        this.articleId = this.allOptions[i].id;
        this.router.navigate(['/article', this.articleId]);
      } 
    }    
  }

  openSelect(){
    this.mostrar = !this.mostrar;
    const asForm = this.toForm.nativeElement;
    if(this.mostrar == true){
      this.renderer2.setStyle(asForm, 'display', 'block');
      //this.renderer2.setStyle(asForm, 'transition', 'all 1s')
    }else{
      this.renderer2.setStyle(asForm, 'display', 'none');
    }
    console.log("Mostrar: ", this.mostrar);
  }
  

}
