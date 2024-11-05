import { UtilsService } from './../../../shared/services/utils.service';
import { EmailPasswordComponent } from 'src/app/components/auth/email-password/email-password.component';
import { User } from 'src/app/shared/models/user';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Login } from '../../../shared/models/login';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor() { }
};
