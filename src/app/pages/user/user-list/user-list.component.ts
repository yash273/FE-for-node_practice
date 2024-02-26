import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../../shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {



  displayedColumns: string[] = [
    'name',
    'email',
    'mobile',
    'country',
    'state',
    'city',
    'isVerified',
    'action'
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
    private userService: UserService
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

    const link = `user?page=${page}&limit=${limit}&q=${filterValue}&sortField=${sortField}&sortOrder=${sortDirection}`;

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
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: {userId : userId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.getUserData();
      }
    });
  }
}
