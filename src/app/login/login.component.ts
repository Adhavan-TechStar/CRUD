import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  credentials = { email: '', password: '' }; // Stores login input
  errorMessage: string | null = null; // Displays error message if login fails

  constructor(private authService: AuthService, private router: Router) {}
 // const loginData = {
    //   email: this.credentials.email,
    //   password: this.credentials.password,
    // };

  // login(form: NgForm) {
  //   if (!form.valid) {
  //     this.errorMessage = 'Please fill in all required fields.';
  //     return;
  //   }

   
  //   this.authService.login(loginData).subscribe(
  //     (response: any) => {
  //       // Ensure the response contains the 'token'
  //       if (response && response.token) {
  //         this.authService.setAuthToken(response.token); // Save token in AuthService
  //         alert('Login successful!');
  //         this.router.navigate(['/user-dashboard']); // Redirect to user dashboard
  //       } else {
  //         // Handle unexpected backend response
  //         this.errorMessage = response.message || 'Invalid login credentials.';
  //       }
  //     },
  //     (error) => {
  //       console.error('Error during login:', error);
  //       // Handle backend error or server issue
  //       this.errorMessage =
  //         error.error?.message ||
  //         'Server error occurred. Please try again later.';
  //     }
  //   );
  // }

  login(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
  
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        // Ensure the response contains the token
        if (response && response.token) {
          this.authService.setAuthToken(response.token); // Save token
          alert('Login successful!');
          this.router.navigate(['/user-dashboard']); // Navigate to dashboard
        } else {
          this.errorMessage = 'Invalid login response. Token not found.';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage =
          error.error?.message || 'Server error occurred. Please try again.';
      }
    );
  }
}
