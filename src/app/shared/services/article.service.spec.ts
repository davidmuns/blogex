import { Usuario } from './../models/usuario';
import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Article } from '../models/article';
import { environment } from 'src/environments/environment';

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

describe('ArticleService', () => {
    articles.push(article);
    articles.push(article2);
    let articleSvc: ArticleService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ArticleService]
        })
        articleSvc = TestBed.inject(ArticleService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(articleSvc).toBeTruthy();
    });

    it('should return an observable of an article', () => {
        articleSvc.getArticle(article.id).subscribe(a => {
            expect(a).toEqual(article);
        });

        const req = httpTestingController.expectOne(environment.BACKEND_BASE_URL + 'article/one/' + article.id);
        expect(req.request.method).toEqual('GET');

        req.flush(article);
    });

    it('should return an observable of an article list', () => {
        articleSvc.getArticlesByUsername(usuario.nombreUsuario).subscribe(a => {
            expect(a).toEqual(articles);
        });
        const req = httpTestingController.expectOne(environment.BACKEND_BASE_URL + 'article/list/' + usuario.nombreUsuario);
        expect(req.request.method).toEqual('GET');
        req.flush(articles);
    });

    it('should return an observable of all of the articles', () => {
        articleSvc.getAll().subscribe(a => {
            expect(a).toEqual(articles);
        });
        const req = httpTestingController.expectOne(environment.BACKEND_BASE_URL + 'article/list');
        expect(req.request.method).toEqual('GET');
        req.flush(articles);
    });

    it('should return call method "POST"', () => {
        articleSvc.createArticle(article2, usuario.nombreUsuario).subscribe(resp => {
            expect(resp).toBeTruthy();
        });
        const req = httpTestingController.expectOne(environment.BACKEND_BASE_URL + 'article/create/' + usuario.nombreUsuario);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body.usuario.nombreUsuario).toBe('davidmuns'); 
        req.flush({ success: true });
    });

    it('should return call method "PUT"', () => {
        articleSvc.updateArticle(article2.id, article2).subscribe(resp => {
            expect(resp).toBeTruthy();
        });
        const req = httpTestingController.expectOne(environment.BACKEND_BASE_URL + 'article/update/' + article2.id);
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body.usuario.nombreUsuario).toBe('davidmuns'); 
        req.flush({ success: true });
    });


});