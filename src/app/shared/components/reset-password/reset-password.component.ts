import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { pass } from '../../regexRules';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,],
  providers: [UserService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  hide = true;
  hideConfirm = true;
  resetPassForm !: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.resetPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(pass)]],
      confirmPassword: ['', Validators.required],
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


  resetPass() {
    if (this.resetPassForm.invalid) {
      this.resetPassForm.markAllAsTouched();
      return;
    }

    const formData = { ...this.resetPassForm.value };
    delete formData.confirmPassword;

    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        const link = `reset-password/${token}`;

        this.userService.executeUserService(formData, link)
          .subscribe({
            next: (v: any) => {
              this.alertService.showAlert(v.message, 'success');
              setTimeout(() => {
                this.router.navigate([`/login`]);

              }, 3000)
            },
            error: (e) => {
              this.alertService.showAlert(e.error.message, 'error');
            },
          });
      }
    });


  }

}
