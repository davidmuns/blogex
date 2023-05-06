import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailPasswordComponent } from './email-password.component';
import { Email } from 'src/app/shared/models/Email';
import { EmailPasswordService } from 'src/app/shared/services/email-password.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const email: Email = {
  emailTo: "davidmuns@yahoo.es"
}

describe('EmailPasswordComponent', () => {
  let component: EmailPasswordComponent;
  let fixture: ComponentFixture<EmailPasswordComponent>;
  let utilsSvcSpyObj: jasmine.SpyObj<UtilsService>;
  let dialogSpyObj: jasmine.SpyObj<MatDialog>;
  let emailPassSvcSpyObj: jasmine.SpyObj<EmailPasswordService>;
 
  beforeEach(async () => {
    utilsSvcSpyObj = jasmine.createSpyObj<UtilsService>('UtilsService', ['showSnackBar']);
    dialogSpyObj = jasmine.createSpyObj<MatDialog>('MatDialog', ['closeAll', 'open']);
    emailPassSvcSpyObj = jasmine.createSpyObj<EmailPasswordService>('EmailPasswordService', ['sendEmail']);
   
    await TestBed.configureTestingModule({
      declarations: [EmailPasswordComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        AuthService,
        { provide: UtilsService, useValue: utilsSvcSpyObj },
        { provide: MatDialog, useValue: dialogSpyObj },
        { provide: EmailPasswordService, useValue: emailPassSvcSpyObj },

      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize email form with empty values', () => {
    expect(component.emailForm.value).toEqual({ emailTo: ''});
  });


  it('should display its corresponding msg when onSubmit method is called with a valid form', () => {
    const msg = "We have sent an email to " + email.emailTo;
    const spy = emailPassSvcSpyObj.sendEmail.and.returnValue(of({ mensaje: msg }));
    component.emailForm.setValue({ emailTo: email.emailTo });
    component.onSubmit(component.emailForm.value);
    expect(spy).toHaveBeenCalled();
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith(msg, 5000);
  });

  it('should display its corresponding msg when onSubmit method is called with a NOT valid form', () => {
    component.emailForm.setValue({ emailTo: '' });
    component.onSubmit(component.emailForm.value);
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalledWith('auth.email-send.fill-blanks', 5000);
  });


  it('should return error msg when onSubmit method is called', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Email or username does not exist.',
      status: 404,
      statusText: 'Not Found'
    });
    emailPassSvcSpyObj.sendEmail.and.returnValue(throwError(() => errorResponse));
    component.emailForm.setValue({ emailTo: email.emailTo });
    component.onSubmit(component.emailForm.value);
    expect(utilsSvcSpyObj.showSnackBar).toHaveBeenCalled();
  });


});
