import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AlertService } from '../../../../shared/components/alert/alert.service';
import { LocationService } from '../../../../shared/services/location.service';
import { UserService } from '../../../../shared/user.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-addresses',
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
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [UserService, AlertService, LocationService],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss'
})
export class AddressesComponent {

  user: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'country',
    'state',
    'city',
    'action',
  ];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = this.data;
    this.userService.executeGetUserService(`address/${this.user.id}`)
      .subscribe({
        next: (e: any) => {
          this.dataSource.data = e.addresses;
        },
        error: (e: any) => {
          console.log(e);
        },
      })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  editAddress(addressId : any){
    console.log("addressID", addressId)
  }
}
