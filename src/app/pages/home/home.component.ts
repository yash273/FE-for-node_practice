import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { LocationService } from '../../shared/services/location.service';
import { UserService } from '../../shared/user.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatButtonModule , SidebarComponent, CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
    ],
  providers: [UserService, AlertService, LocationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  countries: any = [];
  states: any = [];
  selectedCountry:any;

  constructor(
    private userService: UserService,
    private locationService: LocationService
  ) { }

  ngOnInit(){
    this.locationService.getLocation('new/countires')
    .subscribe({
      next: (v: any) => {
        this.countries = v.countries;
        this.selectedCountry = v.countries[0]._id;
        const model = { value : v.countries[0]._id};
        this.getStates(model);
      }
    });
  }

  getStates(event : any) {
    const countryId = event.value;
    this.selectedCountry = event.value;
    const link = `new/states/${countryId}`;
    this.locationService.getLocation(link)
    .subscribe({
      next: (v: any) => {
        this.states = v.states;
      }
    })
  }
}
