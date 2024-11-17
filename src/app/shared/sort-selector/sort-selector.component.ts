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
      { value: 'title-az', text: this.translateSvc.instant('user-blog.title-az') },
      { value: 'title-za', text: this.translateSvc.instant('user-blog.title-za') },
      { value: 'older', text: this.translateSvc.instant('user-blog.older') },
      { value: 'newer', text: this.translateSvc.instant('user-blog.newer') }
    ];
  }

  onSortBy(): void {
    this.selectedOption.emit(this.option);
  }
}
