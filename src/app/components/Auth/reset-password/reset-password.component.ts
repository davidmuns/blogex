import { UtilsService } from './../../../shared/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmailPasswordService } from 'src/app/shared/services/email-password.service';
import { ResetPassword } from './../../../shared/models/reset-password';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  hide: boolean = true;
  tokenPassword!: string;
  user!: User | null | undefined;

  constructor(
    private utilsSvc: UtilsService,
    private readonly fb: FormBuilder,
    private emailPasswordService: EmailPasswordService,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.tokenPassword = this.activatedRoute.snapshot.paramMap.get('token-password') as string;
    this.getUser(this.tokenPassword);
    this.initform();
  }

  private initform(): void {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(resetPassword: ResetPassword) {
    if (this.resetForm.valid) {

      resetPassword.tokenPassword = this.tokenPassword;
      this.emailPasswordService.resetPassword(resetPassword).subscribe({
        next: data => {
          const msg = data.mensaje + ' Redirigiendo a página de inicio...';
          this.utilsSvc.showSnackBar(msg, 5000);
          setTimeout(() => { this.router.navigate(['']); }, 3000);
        },
        error: err => {
          const msg = this.translateService.instant('auth.reset-pass.no-match');
          this.utilsSvc.showSnackBar(msg, 5000);
          this.resetForm.reset();
        }
      });
    
    }else {
      const msg = this.translateService.instant('auth.reset-pass.fill-blanks');
      this.utilsSvc.showSnackBar(msg, 3000);
    };

  };

  private getUser(tokenPassword: string) {
    this.authService.getUserByTokenPassword(tokenPassword).subscribe({
      next: data => {
        this.user = data;
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.mensaje, 5000);
      }
    });
  };
};
