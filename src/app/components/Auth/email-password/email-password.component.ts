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
  uploading = false;

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
    this.uploading = true;
    this.emailPasswordService.sendEmail(email).subscribe({
      next: data => {
        this.uploading = false;
        console.log(this.emailForm.value);
        
        const msg = this.translateService.instant('auth.email-send.valid') + ' ' + email.emailTo;
        this.utilsSvc.showSnackBar(msg, 7000)
        this.dialog.closeAll();
      },
      error: err => {
        this.uploading = false;
        const msg = this.translateService.instant('auth.email-send.incorrect');
        this.utilsSvc.showSnackBar(msg, 7000)
      }
    });
  }

}
