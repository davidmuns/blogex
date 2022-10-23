import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontArticlesComponent } from './front-articles.component';

describe('FrontArticlesComponent', () => {
  let component: FrontArticlesComponent;
  let fixture: ComponentFixture<FrontArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
