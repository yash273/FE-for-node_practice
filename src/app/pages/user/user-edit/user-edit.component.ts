import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordDialogComponent } from '../../../shared/components/forgot-password-dialog/forgot-password-dialog.component';
import { UserService } from '../../../shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../../shared/components/alert/alert.service';
import { MatSelectModule } from '@angular/material/select';
import { LocationService } from '../../../shared/services/location.service';
@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [UserService, AlertService, LocationService],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {

  userModel: any;
  userForm !: FormGroup;
  countries: any;
  states: any;
  cities: any;
  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstname: [{ value: '', disabled: true }],
      lastname: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      mobile: [{ value: '', disabled: true }],
      countryId: [{ value: '', disabled: true }],
      stateId: [{ value: '', disabled: true }],
      cityId: [{ value: '', disabled: true }]
    });

    this.locationService.getLocation('countires').subscribe({
      next: (v: any) => {
        this.countries = v.countries
      }
    });

    const userId = this.data.userId;
    this.userService.getUserById(userId).subscribe({
      next: (v: any) => {
        this.userForm = this.formBuilder.group({
          firstname: [{ value: v.firstname, disabled: true }],
          lastname: [{ value: v.lastname, disabled: true }],
          email: [{ value: v.email, disabled: true }],
          mobile: [{ value: v.mobile, disabled: true }],
          countryId: [v.countryId],
          stateId: [v.stateId],
          cityId: [v.cityId]
        });

        this.userForm.patchValue(v)

      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update(): void {
    // this.userForm.get('firstname')?.enable();
    // this.userForm.get('lastname')?.enable();
    // this.userForm.get('email')?.enable();
    // this.userForm.get('mobile')?.enable();
    this.dialogRef.close('true');
    this.userService.updateUser(this.userForm.value,this.data.userId).subscribe({
      next: (v: any) => {
      }
    })
  }

  getStates(event: any) {
    const countryId = this.userForm.get('countryId')?.value;
    // const countryId = event.value;
    const link = `states/${countryId}`;
    this.locationService.getLocation(link).subscribe({
      next: (v: any) => {
        this.states = v.states;
      }
    })
  }

  getCities(event: any) {
    const stateId = event.value;
    const link = `cities/${stateId}`;
    this.locationService.getLocation(link).subscribe({
      next: (v: any) => {
        this.cities = v.cities;
      }
    })
  }


}
