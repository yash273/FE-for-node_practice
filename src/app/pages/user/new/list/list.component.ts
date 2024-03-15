import { HttpClientModule } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { UserService } from '../../../../shared/user.service';
import { EditComponent } from '../edit/edit.component';
import { AddressesComponent } from '../addresses/addresses.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SidebarComponent, 
    HttpClientModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [UserService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  displayedColumns: string[] = [
    'name',
    'email',
    'mobile',
    'isVerified',
    'action',
    'addresses'
  ];
  dataSource = new MatTableDataSource();
  pageSizeOption = [5, 10, 20];
  itemsPerPage = this.pageSizeOption[0];
  currentPage = 1;
  sortField: string = 'firstname';
  sortDirection: string = 'asc';
  pageSize: number = this.itemsPerPage
  totalItems: number = 50;
  filterValue: string = '';

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private renderer: Renderer2
  ) {

  }

  ngOnInit(): void {
    this.getUserData();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.getUserData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (filterValue.length > 2 || filterValue === '') {
      this.filterValue = filterValue;
      this.dataSource.paginator?.firstPage();
      this.currentPage = 1;
      this.getUserData();
    }
  }

  matSortChange(event: any) {
    if (event.active == 'name') {
      this.sortField = 'firstname';
    } else {
      this.sortField = event.active;
    }
    this.sortDirection = event.direction;
    this.getUserData();
  }


  getUserData() {
    const page = this.currentPage;
    const limit = this.itemsPerPage;
    const filterValue = this.filterValue;
    const sortField = this.sortField;
    const sortDirection = this.sortDirection;

    const link = `usernew?page=${page}&limit=${limit}&q=${filterValue}&sortField=${sortField}&sortOrder=${sortDirection}`;

    this.userService.executeGetPaginatedUserService(link)
      .subscribe({
        next: (v: any) => {
          this.dataSource.data = v.users;
          this.totalItems = v.totalCount;
        },
        error: (e: any) => {
          console.log(e);
        },
      });

  }

  editUser(userId: any){
    const dialogRef = this.dialog.open(EditComponent, {
      data: {userId : userId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.getUserData();
      }
    });
  }

  viewAddress(user:any){
    const userModel = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname
    }
    const DialogPosition = {
      right: '40px',
    }
    console.log("viewAddress", userModel);
    const dialogRef = this.dialog.open(AddressesComponent, {
      panelClass: 'custom-dialog',
      data: userModel,
      position: DialogPosition,
      minHeight: 400,
      minWidth: 300,
      maxWidth: 800,
      maxHeight: 600,
    });

    dialogRef.afterOpened().subscribe(() => {
      const overlayPane = document.querySelector('.cdk-overlay-pane');
      if (overlayPane) {
        this.renderer.addClass(overlayPane, 'opening');
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result == 'true') {
      //   this.getUserData();
      // }

      console.log("addresses closed")

    });

  }
  
}
