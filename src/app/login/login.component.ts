import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';  // Ensure UserService is correctly defined in your app
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
})
export class LoginComponent {
  credentials = { email: '', password: '' };  // Stores login input
  errorMessage: string | null = null;          // Displays error message if login fails

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    // Ensure form validation
    if (!form.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    // Prepare login data based on LoginModel
    const loginData = {
      email: this.credentials.email,
      password: this.credentials.password
    };

    // Calling the login API using the UserService to validate credentials
    this.userService.validateUser(loginData).subscribe(
      (response: any) => {
        if (response && response.success) {
          alert(response.message); // Show login success message
          this.router.navigate(['/user-dashboard']); // Navigate to user dashboard
        } else {
          this.errorMessage = response.message || 'Invalid email or password.';  // Show error message
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage =
          error.error?.message || 'Server error occurred. Please try again later.';  // Handle any server errors
      }
    );
  }
}
