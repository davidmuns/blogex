import { EmailPasswordService } from 'src/app/shared/services/email-password.service';
import { User } from '../../../shared/models/user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from 'src/app/shared/models/login';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password.component';

const user: User = {
  nombre: 'David',
  nombreUsuario: 'davidmuns',
  password: '123456',
  email: 'davidmuns@yahoo.es'
}

const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy('getParam')
    }
  }
}

const pass = "wodqno9832hjn";

const errorResponse = new HttpErrorResponse({
  error: 'Fake error',
  status: 500,
  statusText: 'Internal Server Error'
});

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: AuthService;
  let utilsSvcSpyObj: jasmine.SpyObj<UtilsService>;
  let emailPasswordSvcSpyObj: jasmine.SpyObj<EmailPasswordService>;

  beforeEach(async () => {
    utilsSvcSpyObj = jasmine.createSpyObj<UtilsService>('UtilsService', ['showSnackBar']);
    emailPasswordSvcSpyObj = jasmine.createSpyObj<EmailPasswordService>('EmailPasswordService', ['resetPassword']);
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        AuthService,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UtilsService, useValue: utilsSvcSpyObj },
        { provide: EmailPasswordService, useValue: emailPasswordSvcSpyObj }

      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with empty values', () => {
    expect(component.resetForm.value).toEqual({ newPassword: '', confirmPassword: '' });
  });

  it('should call emailPasswordService.resetPassword when onSubmit is called with valid login form', () => {
    const msg = "Password modificado.";
    const spy = emailPasswordSvcSpyObj.resetPassword.and.returnValue(of({ mensaje: msg }));
    component.resetForm.setValue({ newPassword: pass, confirmPassword: pass });
    component.onSubmit(component.resetForm.value);
    expect(spy).toHaveBeenCalled();
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith(msg + ' Redirigiendo a página de inicio...', 5000);
  });

  it('should display its corresponding msg when onSubmit method is called with a NOT valid form', () => {
    component.resetForm.setValue({ newPassword: '', confirmPassword: '' });
    component.onSubmit(component.resetForm.value);
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith('auth.reset-pass.fill-blanks', 3000);
  });

  it('should return error msg when onLogin method is called', () => {
    emailPasswordSvcSpyObj.resetPassword.and.returnValue(throwError(() => errorResponse));
    component.resetForm.setValue({ newPassword: pass, confirmPassword: pass });
    component.onSubmit(component.resetForm.value);
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith('auth.reset-pass.no-match', 5000);
  });

  it('should return valid user', () => {
    component.tokenPassword = "mqpweomvcpqmvpqomvit8v3jm";
    spyOn(authService, 'getUserByTokenPassword').and.returnValue(of(user));
    component.ngOnInit()
    expect(component.user?.nombreUsuario).toBe(user.nombreUsuario);

  });

  it('should launch error msg when user does not exist', () => {
    spyOn(authService, 'getUserByTokenPassword').and.returnValue(throwError(() => errorResponse));
    component.ngOnInit()
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalled();
  });

});
