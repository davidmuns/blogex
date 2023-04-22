
import { Usuario } from './../../shared/models/usuario';
import { Article } from './../../shared/models/article';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArticleComponent } from './article.component';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safehtml.pipe';
import { of } from 'rxjs';


const usuario: Usuario = {
  id: 1,
  nombre: 'David',
  nombreUsuario: 'davidmuns'
}

const article: Article = {
  id: 1,
  title: 'Barcelona',
  alt1: 'Hotel Vela',
  text1: 'Content',
  longitude: 34,
  latitude: 23,
  imagenPortada: "",
  usuario: usuario,
  imagenes: [],
  videos: []
};

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let articleSvcSpyObj: jasmine.SpyObj<ArticleService>;
  let routerSpyObj: jasmine.SpyObj<Router>;
  let utilsSvcSpyObj: jasmine.SpyObj<UtilsService>;

  beforeEach(async () => {
    articleSvcSpyObj = jasmine.createSpyObj<ArticleService>('ArticleService', ['getArticle']);
    routerSpyObj = jasmine.createSpyObj<Router>('Router', ['navigate']);
    utilsSvcSpyObj = jasmine.createSpyObj<UtilsService>('UtilsService', ['showSnackBar']);
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent, SafeHtmlPipe],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        })
      ],
      providers: [
        { provide: UtilsService, useValue: utilsSvcSpyObj },
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: (key: string) => '1' }) } },
        { provide: Router, useValue: routerSpyObj },
        { provide: ArticleService, useValue: articleSvcSpyObj },
       
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(component).toBeInstanceOf(ArticleComponent);
  });

  it("Method ngOnInit shoud get an article", () => {
    articleSvcSpyObj.getArticle.and.returnValue(of(article));
    component.ngOnInit();
    expect(component.post?.title).toEqual('Barcelona');
  });

  it("Method onGoToMap should set focusArticleOnMap to true", () => {
    component.post = article;
    component.onGoToMap();
    expect(articleSvcSpyObj.data).toBe(article);
    expect(articleSvcSpyObj.focusArticleOnMap).toBeTrue();
    expect(routerSpyObj.navigate).toHaveBeenCalledWith(['home']);
  });

  it("Method onEdit shoul call navigate method", () => {
    const navigationExtras: NavigationExtras = component.navigationExtras;
    component.onEdit(article);
    expect(routerSpyObj.navigate).toHaveBeenCalled();
    expect(routerSpyObj.navigate).toHaveBeenCalledWith(['admin/edit'], navigationExtras );
  });
});
