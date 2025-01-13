import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ComponentFormComponent } from './component-form/component-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page as the default route
  { path: 'register', component: ComponentFormComponent }, // Registration page
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'user-dashboard', component: UserDashboardComponent }, // User Dashboard page
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback to Home for unknown routes
];

