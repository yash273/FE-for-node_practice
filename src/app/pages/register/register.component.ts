import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../shared/components/alert/alert.service';
import { email, mob, name, pass } from '../../shared/regexRules';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, AlertService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  hide = true;
  hideConfirm = true;
  registerForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(email)]],
      password: ['', [Validators.required, Validators.pattern(pass)]],
      confirmPassword: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(mob)]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  //confirm password validator function
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  //register user
  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = { ...this.registerForm.value };
    delete formData.confirmPassword;

    this.userService.executeUserServiceLogin(formData, 'register')
      .subscribe({
        next: (v) => {
          this.alertService.showAlert("Please check your mail to verify your email", 'default', 10000);
        },
        error: (e) => {
          this.alertService.showAlert(e.error.message, 'error');
        },
      });
  }

}
