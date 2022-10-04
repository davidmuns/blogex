import { EmailPasswordService } from 'src/app/shared/services/email-password.service';
import { ResetPassword } from './../../../shared/models/reset-password';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
    private emailPasswordService: EmailPasswordService,
    private readonly router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.loginForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }
  
  onSubmit(resetPassword: ResetPassword) {
    resetPassword.tokenPassword = this.activatedRoute.snapshot.paramMap.get('tokenPassword') as string;
    this.emailPasswordService.resetPassword(resetPassword).subscribe({
      next: data => {
        this.toastr.success(data.mensaje + ' Redirecting to home...', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        setTimeout(() => { this.router.navigate(['']); }, 3000);
      },
      error: err => {
        this.toastr.error(err.error.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        setTimeout(() => {  window.location.reload(); }, 3000);
      }
    });
  }
}
