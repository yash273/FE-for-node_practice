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
import {MatCardModule} from '@angular/material/card';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatButtonModule , SidebarComponent, CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCardModule
    ],
  providers: [UserService, AlertService, LocationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  countries: any = [];
  states : any = [];
  selectedCountry:any;
  chart: any;
  statesName:any;
  usersPerState: any;
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
    const link = `new/user_per_states/${countryId}`;
    this.locationService.getLocation(link)
    .subscribe({
      next: (v: any) => {
        this.states = v.states;
        this.statesName = this.states.map((s : any) => s.name);
        this.usersPerState = this.states.map((u : any) => u.usersCount);
        console.log('this.usersPerState', this.usersPerState)
        this.chart?.destroy();
        this.createChart();
      }
    })
  }

  createChart(){
  const maxValue = Math.max(... this.usersPerState)
    this.chart = new Chart("MyChart", {
      type: 'bar', 
      data: {
        labels: this.statesName, 
	       datasets: [
          {
            label: "Users",
            data: this.usersPerState,
            backgroundColor: '#FFB0C1',
            borderColor: '#FF6384',
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Users per State'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Value'
            },
            min: 0,
            max: maxValue,
            ticks: {
              stepSize: 1
            }
          }
        }
      },
      
    });
  }
}
