import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

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

  login(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        if (response && response.token) {
          this.authService.setAuthToken(response.token); // Save token
          alert('Login successful!');
          this.router.navigate(['/user-dashboard']); // Navigate to user dashboard
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
