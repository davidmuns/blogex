import { TokenService } from 'src/app/shared/services/token.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailPasswordComponent } from '../auth/email-password/email-password.component';
import { DeleteComponent } from '../crud/delete/delete.component';
import { User } from 'src/app/shared/models/user';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  protected form!: FormGroup;
  private user!: User;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authSvc: AuthService,
    private readonly tokenSvc: TokenService,
    private readonly dialog: MatDialog,
    private readonly utilsSvc: UtilsService
  ) { }

  ngOnInit(): void {
    const username = this.tokenSvc.getUsername();
    if (username != null) {
      this.authSvc.getUserByUsername(username).subscribe({
        next: (data: User) => {
          this.user = data;
          this.form.patchValue(data)
        }
      })
    }
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      nombre: [''],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.form.get('nombreUsuario')?.disable();
  }

  onSubmit() {
    this.authSvc.updateUser(this.user.id, this.form.value).subscribe({
      next: data => {
        this.utilsSvc.showSnackBar(data.mensaje, 5000);
      },
      error: err => {
        this.utilsSvc.showSnackBar(err.error.mensaje, 5000);
      },
    })
  }

  onDeleteAccount() {
    this.dialog.open(DeleteComponent, {
      data: { option: "deleteAccount" },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  }

  onSetPassword() {
    this.dialog.closeAll();
    this.dialog.open(EmailPasswordComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
}

