import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Article } from '../models/article';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort-selector',
  templateUrl: './sort-selector.component.html',
  styleUrls: ['./sort-selector.component.scss']
})
export class SortSelectorComponent implements OnInit, OnDestroy {
  @Output() selectedOption = new EventEmitter<string>();
  option = '';
  sortOptions: { value: string; text: string }[] = [];
  langChangeSubscription!: Subscription;

  constructor(private readonly translateSvc: TranslateService) { }

  ngOnInit(): void {
    this.setSortOptions(); // Inicializar las opciones al cargar
    this.langChangeSubscription = this.translateSvc.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setSortOptions(); // Actualizar opciones cuando cambie el idioma
    });
  }

  ngOnDestroy(): void {
    // Liberar la suscripción para evitar fugas de memoria
    this.langChangeSubscription.unsubscribe();
  }

  setSortOptions(): void {
    this.sortOptions = [
      { value: 'newer', text: this.translateSvc.instant('user-blog.newer') },
      { value: 'more-activity', text: this.translateSvc.instant('user-blog.activity') },
      { value: 'older', text: this.translateSvc.instant('user-blog.older') },
      { value: 'title-az', text: this.translateSvc.instant('Title') + ' (A-Z)' },
      { value: 'title-za', text: this.translateSvc.instant('Title') + ' (Z-A)' },
      { value: 'username-az', text: this.translateSvc.instant('Username') + ' (A-Z)' },
      { value: 'username-za', text: this.translateSvc.instant('Username') + ' (Z-A)' },
    ];
  }

  onSortBy(): void {
    this.selectedOption.emit(this.option);
  }
}
