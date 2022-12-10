import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../../../shared/models/email';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmailPasswordService } from 'src/app/shared/services/email-password.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-email-password',
  templateUrl: './email-password.component.html',
  styleUrls: ['./email-password.component.scss']
})
export class EmailPasswordComponent implements OnInit {

  emailForm!: FormGroup;
  emailONombreUsuario!: string;
  emailDto!: Email;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.emailForm = this.fb.group({
      emailTo: ['', Validators.required]
    })
  }

  onSubmit(email: Email) {
    if(this.emailForm.valid){
      this.sendEmail(email);
    }else{
      this.toastr.error(this.translateService.instant('auth.email-send.fill-blanks'), '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
  }

  private sendEmail(email: Email){
    this.emailPasswordService.sendEmail(email).subscribe({
      next: data => {
        this.toastr.success(data.mensaje, '', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
        this.dialog.closeAll();
      },
      error: err => {
        this.toastr.error(err.error.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    });
  }

}
