// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { ComponentFormComponent } from './component-form/component-form.component';
// import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
// import { CartComponent } from './cart/cart.component';  
// // import { AuthGuard } from './guards/auth.guard'; // Import AuthGuard

// export const routes: Routes = [
//   { path: '', component: HomeComponent }, 
//   { path: 'register', component: ComponentFormComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'user-dashboard', component: UserDashboardComponent }, // Protected
//   { path: 'cart', component: CartComponent }, // Protected
//   { path: '**', redirectTo: '', pathMatch: 'full' }, 
// ];



// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { ComponentFormComponent } from './component-form/component-form.component';
// import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
// import { CartComponent } from './cart/cart.component';  
// import { authGuard } from './guards/auth.guard'; // Import AuthGuard

// export const routes: Routes = [
//   { path: '', component: HomeComponent }, 
//   { path: 'register', component: ComponentFormComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard] }, // Protected
//   { path: 'cart', component: CartComponent, canActivate: [authGuard] }, // Protected
//   { path: '**', redirectTo: '', pathMatch: 'full' }, 
// ];


import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ComponentFormComponent } from './component-form/component-form.component';
import { LayoutComponent } from './layout/layout.component'; // Import LayoutComponent
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './guards/auth.guard'; // Import AuthGuard
import { ElectronicsComponent } from './categories/electronics/electronics.component';
import { MenComponent } from './categories/men/men.component';
import { OffersComponent } from './categories/offers/offers.component';
import { WomenComponent } from './categories/women/women.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Public route
  { path: 'register', component: ComponentFormComponent }, // Public route
  { path: 'login', component: LoginComponent }, // Public route

  // Routes wrapped in LayoutComponent
  {
    path: '',
    component: LayoutComponent, // Layout with navigation
    canActivate: [authGuard], // Protect user-dashboard and cart routes
    children: [
      { path: 'user-dashboard', component: UserDashboardComponent }, // Protected route
      { path: 'cart', component: CartComponent }, // Protected route
      { path: 'men', component: MenComponent },
      { path: 'women', component: WomenComponent },
      { path: 'electronics', component: ElectronicsComponent },
      { path: 'offers', component: OffersComponent },
    ],
  },

  // Category routes without auth guard
  

  { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback route
];

