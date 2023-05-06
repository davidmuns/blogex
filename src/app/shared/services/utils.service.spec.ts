import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { UtilsService } from "./utils.service";
import { Article } from '../models/article';
import { Usuario } from '../models/usuario';

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

const article2: Article = {
  id: 2,
  title: 'Kiev',
  alt1: 'Maidan',
  text1: 'Content',
  longitude: 34,
  latitude: 23,
  imagenPortada: "",
  usuario: usuario,
  imagenes: [],
  videos: []
};

const articles: Article[] = [];

describe('UtilsService', () => {
  articles.push(article);
  articles.push(article2);
  let utilsSvc: UtilsService;
  let matSnackBarSpyObj: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    matSnackBarSpyObj = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        UtilsService,
        { provide: MatSnackBar, useValue: matSnackBarSpyObj }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    utilsSvc = TestBed.inject(UtilsService);
  });

  it('should order array by title', () => {
    utilsSvc.sortArticlesBy(articles, 'title');
    expect(articles[1].title).toEqual('Kiev');
  })

  it('should order array by date', () => {
    utilsSvc.sortArticlesBy(articles, 'date');
    expect(articles[1].title).toEqual('Barcelona');
  })

  it("should call MatSnackBar's open method with its correspondant msg", () => {
    const msg = "Hello world!"
    const spy = matSnackBarSpyObj.open.and.callThrough();
    utilsSvc.showSnackBar(msg, 3000);
    expect(spy).toHaveBeenCalledOnceWith(msg, 'article.close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
  })

})