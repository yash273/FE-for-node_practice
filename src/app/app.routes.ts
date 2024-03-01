import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EmailVerificationComponent } from './shared/components/email-verification/email-verification.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { ListComponent } from './pages/user/new/list/list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component : LoginComponent
    },
    {
        path: 'register',
        component : RegisterComponent
    },
    {
        path: 'home',
        component : HomeComponent
    },
    {
        path: 'users-list',
        component : UserListComponent
    },
    {
        path: 'new-users-list',
        component : ListComponent
    },
    {
        path: 'verify/:token',
        component : EmailVerificationComponent
    },
    {
        path: 'reset-password/:token',
        component : ResetPasswordComponent
    },
    {
        path: '**',
        component : PageNotFoundComponent
    }
];
