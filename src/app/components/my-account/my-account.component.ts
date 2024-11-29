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
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(){
    console.log('Formulario enviado:', this.form.value);
  }

}

