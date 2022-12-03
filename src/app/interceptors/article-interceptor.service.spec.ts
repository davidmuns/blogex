import { environment } from 'src/environments/environment';

import { HttpRequest } from '@angular/common/http';
import { ArticleInterceptorService } from './article-interceptor.service';

const BEARER = environment.BEARER;
//const TOKEN = environment.TOKEN;

describe('ArticleInterceptorService', () => {
    
    let interceptor: ArticleInterceptorService;
    beforeEach(() => {
        interceptor = new ArticleInterceptorService();
    });

    it('adds the authentication header to the request', () => {

        let modifiedRequest: any;
        const fakeRequest = new HttpRequest('GET', 'fakeUrl');
        const fakeNext = {
            handle: jasmine.createSpy().and.callFake(request => {
                modifiedRequest = request;
            })
        };
        
        interceptor.intercept(fakeRequest, fakeNext);

        expect(fakeNext.handle).toHaveBeenCalled();
        expect(modifiedRequest.headers.has('Authorization')).toEqual(true);
        expect(modifiedRequest.headers.has('Content-Type')).toEqual(true);
        expect(modifiedRequest.headers.has('Authorization')).toEqual('Bearer ncqwoineonqvonuietghtu56525728');

    });

});
