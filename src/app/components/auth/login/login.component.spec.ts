import { User } from './../../../shared/models/user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { LoginComponent } from './login.component';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/shared/services/token.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from 'src/app/shared/models/login';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const user: User = {
  nombre: 'David',
  nombreUsuario: 'davidmuns',
  password: '123456',
  email: 'davidmuns@yahoo.es'
}

const login: Login = {
  nombreUsuario: 'davidmuns',
  password: '123456'

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let utilsSvcSpyObj: jasmine.SpyObj<UtilsService>;
  let dialogSpyObj: jasmine.SpyObj<MatDialog>;
  let routerSpyObj: jasmine.SpyObj<Router>;
  let tokenSvcSpyObj: jasmine.SpyObj<TokenService>;

  beforeEach(async () => {
    utilsSvcSpyObj = jasmine.createSpyObj<UtilsService>('UtilsService', ['showSnackBar']);
    dialogSpyObj = jasmine.createSpyObj<MatDialog>('MatDialog', ['closeAll', 'open']);
    routerSpyObj = jasmine.createSpyObj<Router>('Router', ['navigate']);
    tokenSvcSpyObj = jasmine.createSpyObj<TokenService>('TokenService', ['setToken']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        })
      ],
      providers: [
        AuthService,
        { provide: UtilsService, useValue: utilsSvcSpyObj },
        { provide: MatDialog, useValue: dialogSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: TokenService, useValue: tokenSvcSpyObj },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with empty values', () => {
    expect(component.loginForm.value).toEqual({ nombreUsuario: '', password: '' });
  });

  it('should initialize signup form with empty values', () => {
    expect(component.signupForm.value).toEqual({ nombreUsuario: '', email: '', password: '' });
  });

  it('should call authSvc.loginUser when onLogin is called with valid login form', () => {
    const spy = spyOn(authService, 'loginUser').and.callThrough();
    component.loginForm.setValue({ nombreUsuario: login.nombreUsuario, password: login.password });
    component.onLogin(component.loginForm.value);
    expect(spy).toHaveBeenCalled();
  });

  it('should call close and closeAll methods from MatDialog when signupOpen method is invoked', () => {
    const spy = dialogSpyObj.closeAll.and.callThrough();
    const spy2 = dialogSpyObj.open.and.callThrough();
    component.signupOpen();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should call close and closeAll methods from MatDialog when emailOpen method is invoked', () => {
    const spy = dialogSpyObj.closeAll.and.callThrough();
    const spy2 = dialogSpyObj.open.and.callThrough();
    component.emailOpen();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should call navigate method from Router when onLogin method is invoked with valid form', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    spyOn(authService, 'loginUser').and.returnValue(of({token: token}));
    component.loginForm.setValue({ nombreUsuario: login.nombreUsuario, password: login.password });
    component.onLogin(component.loginForm.value);
    expect(tokenSvcSpyObj.setToken).toHaveBeenCalledOnceWith(token);
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith('Bienvenido de nuevo ' + login.nombreUsuario + '!', 5000);
    expect(routerSpyObj.navigate).toHaveBeenCalledWith(['admin/new']);
  });

  it('should return error msg when onLogin method is called', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'No reconocemos los datos del usuario',
      status: 500,
      statusText: 'Internal Server Error'
    });
    spyOn(authService, 'loginUser').and.returnValue(throwError(() => errorResponse));
    component.loginForm.setValue({ nombreUsuario: login.nombreUsuario, password: login.password });
    component.onLogin(component.loginForm.value);
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith('auth.login.wrong-data', 10000);
  });

  it('should call showSnacBar method from UtilsService when onLogin method is invoked with NOT valid form', () => {
    component.loginForm.setValue({ nombreUsuario: login.nombreUsuario, password: '' });
    component.onLogin(component.loginForm.value);
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith('auth.login.fill-blanks', 5000);
  });
  
  it('should call open method from MatDialog when onSignup method is invoked with valid form', () => {
    const spy = dialogSpyObj.open.and.callThrough();
    spyOn(authService, 'signupUser').and.returnValue(of("User registered"));
    component.signupForm.setValue({  nombreUsuario: user.nombreUsuario, email: user.email, password: user.password });
    component.onSignup(component.signupForm.value);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showSnacBar method from UtilsService when onSignup method is invoked with NOT valid form', () => {
    component.signupForm.setValue({  nombreUsuario: user.nombreUsuario, email: '', password: user.password });
    component.onSignup(component.signupForm.value);
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith('auth.signup.fill-blanks', 3000);
  });
});
