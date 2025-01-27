import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  // Check if the token is valid
  if (!authService.isTokenExpired()) {
    return true; // Allow navigation if the token is valid
  } else {
    // Token is expired or not present
    alert('Session expired. Redirecting to login page.');
    authService.logout(); // Call logout to clear session and token
    router.navigate(['/login']); // Redirect to login page
    return false; // Prevent navigation
  }
};
