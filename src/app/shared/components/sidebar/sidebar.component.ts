import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
interface profile{
  pimage: string,
  pname: string,
  prole: string
}
interface pages{
  pagename: string,
  pagelink: string,
  icondefault: string,
  iconactive: string
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatDividerModule, MatMenuModule, CommonModule, RouterModule , MatButton],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public openSidebar(){
    document.body.classList.toggle('sidebar-open');
  }

  profiles: profile[] = [
    {
      pimage:'./assets/images/user-profile.png',
      pname:'John Doe',
      prole:'Super Admin'
    }
  ]
  sidebar: pages[] = [
    {
      pagename: 'home',
      pagelink: '/home',
      icondefault: './assets/images/ic-dashboard-default.svg',
      iconactive: './assets/images/ic-dashboard-active.svg'
    },
    {
      pagename: 'users',
      pagelink: '/users-list',
      icondefault: './assets/images/ic-statistics-default.svg',
      iconactive: './assets/images/ic-statistics-active.svg'
    },
    // {
    //   pagename: 'docs',
    //   pagelink: '/docs',
    //   icondefault: './assets/images/ic-docs-default.svg',
    //   iconactive: './assets/images/ic-docs-active.svg'
    // },
    // {
    //   pagename: 'maintenance',
    //   pagelink: '/maintenance',
    //   icondefault: './assets/images/ic-maintenance-default.svg',
    //   iconactive: './assets/images/ic-maintenance-active.svg'
    // },
    // {
    //   pagename: 'orders',
    //   pagelink: '/orders',
    //   icondefault: './assets/images/ic-orders-default.svg',
    //   iconactive: './assets/images/ic-orders-active.svg'
    // },
    // {
    //   pagename: 'users',
    //   pagelink: '/users',
    //   icondefault: './assets/images/ic-users-default.svg',
    //   iconactive: './assets/images/ic-users-active.svg'
    // },
    // {
    //   pagename: 'settings',
    //   pagelink: '/settings',
    //   icondefault: './assets/images/ic-settings-default.svg',
    //   iconactive: './assets/images/ic-settings-active.svg'
    // }
  ]
}
