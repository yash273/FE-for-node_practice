import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../../shared/components/forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, AlertService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  loginForm !: FormGroup;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private userService: UserService, private alertService : AlertService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.executeUserService(this.loginForm.value, 'login')
      .subscribe({
        next: (v : any ) => {
          this.alertService.showAlert("Succesfully Logged in!", 'success');
          localStorage.setItem('token', v.token);
        },
        error: (e) => {
          this.alertService.showAlert(e.error.message, 'error');
        },
      });
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result)

      }
    });
  }
  
}
