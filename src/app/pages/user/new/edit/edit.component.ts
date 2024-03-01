import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AlertService } from '../../../../shared/components/alert/alert.service';
import { ForgotPasswordDialogComponent } from '../../../../shared/components/forgot-password-dialog/forgot-password-dialog.component';
import { LocationService } from '../../../../shared/services/location.service';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  userModel: any;
  userForm !: FormGroup;
  countries: any;
  states: any;
  cities: any;
  constructor(
    public dialogRef: MatDialogRef<any>,
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

    this.locationService.getLocation('new/countires').subscribe({
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
          countryId: [v.country],
          stateId: [v.state],
          cityId: [v.city]
        });

        this.userForm.patchValue(v)

      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.dialogRef.close('true');
    const x = {
      country : this.userForm.value.countryId,
      state : this.userForm.value.stateId,
      city : this.userForm.value.cityId,
    }
    this.userService.updateUser(x,this.data.userId).subscribe({
      next: (v: any) => {
      }
    })
  }

  getStates(event: any) {
    const countryId = this.userForm.get('countryId')?.value;
    const link = `new/states/${countryId}`;
    this.locationService.getLocation(link).subscribe({
      next: (v: any) => {
        this.states = v.states;
      }
    })
  }

  getCities(event: any) {
    const stateId = this.userForm.get('stateId')?.value;
    const link = `new/cities/${stateId}`;
    this.locationService.getLocation(link).subscribe({
      next: (v: any) => {
        this.cities = v.cities;
      }
    })
  }

  
}
