import { TokenService } from 'src/app/shared/services/token.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailPasswordComponent } from '../auth/email-password/email-password.component';
import { DeleteComponent } from '../crud/delete/delete.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  protected form!: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly authSvc: AuthService,
    private readonly tokenSvc: TokenService,
    private readonly dialog: MatDialog,
  ) { }
  
  ngOnInit(): void {
    const username = this.tokenSvc.getUsername();
    if( username != null){
      this.authSvc.getUserByUsername(username).subscribe({
        next: data => {
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
    this.form.get('email')?.disable();
  }

  onSubmit(){
   console.log("UPDATE USER ", this.form.value);
  }

  onDeleteAccount() {
    this.dialog.open(DeleteComponent, {
      data: { option: "deleteAccount" },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });
  }

  emailOpen() {
    this.dialog.closeAll();
    this.dialog.open(EmailPasswordComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
}

