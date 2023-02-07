import { UtilsService } from './../../../shared/services/utils.service';
import { Email } from './../../../shared/models/Email';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { EmailPasswordService } from 'src/app/shared/services/email-password.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-email-password',
  templateUrl: './email-password.component.html',
  styleUrls: ['./email-password.component.scss']
})
export class EmailPasswordComponent {

  emailForm: FormGroup = this.fb.group({
    emailTo: ['', Validators.required]
  })
  emailONombreUsuario!: string;
  emailDto!: Email;

  constructor(
    private utilsSvc: UtilsService,
    private emailPasswordService: EmailPasswordService,
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    private translateService: TranslateService
  ) { };

  onSubmit(email: Email) {
    if (this.emailForm.valid) {
      this.sendEmail(email);
    } else {
      const msg = this.translateService.instant('auth.email-send.fill-blanks');
      this.utilsSvc.showSnackBar(msg, 5000)
    };
  };

  private sendEmail(email: Email) {
    this.emailPasswordService.sendEmail(email).subscribe({
      next: data => {
        this.utilsSvc.showSnackBar(data.mensaje, 5000);
        this.dialog.closeAll();
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.mensaje, 5000);
      }
    });
  }

}
