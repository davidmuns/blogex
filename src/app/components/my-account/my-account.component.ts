import { TokenService } from 'src/app/shared/services/token.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private readonly tokenSvc: TokenService
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
  }

  onSubmit(){
   console.log("UPDATE USER ", this.form.value);
  }
}

