import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.scss']
})
export class Search2Component implements OnInit {
  articles: Article[] = [];
  formGroup!: FormGroup;
  filteredOptions: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router, 
    private readonly articleSvc: ArticleService) {}

  ngOnInit() {
    this.initForm();
    this.getArticles();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'title' : ['']
    })
    this.formGroup.get('title')?.valueChanges.subscribe( (response: any) => {  
      this.filteredArticles(response)
    })
  }

  private getArticles() {
    this.articleSvc.getAll().subscribe({
      next: data => {
        this.articles = data;
        this.filteredOptions = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private getArticles2() {
    this.articleSvc.getAll().pipe(
     map( response => response.map(item => item['title']))
    )
  }

  clearInput(): void {
    this.formGroup.reset();  // O también puedes usar this.myControl.setValue('') para borrar el contenido.

  }

  filteredArticles(value: any){
    this.filteredOptions = this.articles.filter(item => {
      return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    })
  }

  displayFn(article: any): string {
    return article ? article.title : '';
  }

  onArticleSelected(title: any): void {
    // Aquí puedes realizar la navegación al artículo
    console.log('Artículo seleccionado:', title);
    for (const option of this.articles) {
      if (option.title === title) {
        
        this.router.navigate(['article', option.id]);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        break;
      }
    }
  }
}
